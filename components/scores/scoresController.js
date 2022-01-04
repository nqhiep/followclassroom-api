const formidable = require('formidable');
const scoresService = require('./scoresService');
const ClassRole = require('../../enums/class_role.enum');

const { parseScoresFromExcel, ExportScoresToExcel } = require('./fileHelper');
class scoresController {
    async updateSpecificScore(req, res, next) {
        try {
            const { studentId, score } = req.body;
            const gradeId = req.params.gradeId;
            const grade = await scoresService.findGradeById(gradeId);
            if (!grade) {
                return next(new Error("Not found grade"));
            }

            const isTeacher = await scoresService.checkRoleInClass(grade.class_id, req.user.id, ClassRole.TEACHER);

            if (!isTeacher) {
                return next(new Error("Not have permission"));
            }

            const scoreBasedWeight = score * grade.weight / 10;
            await scoresService.createOrUpdateSpecificScore(gradeId, studentId, score, scoreBasedWeight);

            res.json({
                isSuccess: true,
                message: "Update score successfully"
            })
        } catch (err) {
            next(err);
        }
    }

    async importScores(req, res, next) {
        try {
            const gradeId = req.params.gradeId;
            const grade = await scoresService.findGradeById(gradeId);
            if (!grade) {
                return next(new Error("Not found grade"));
            }

            const isTeacher = await scoresService.checkRoleInClass(grade.class_id, req.user.id, ClassRole.TEACHER);

            if (!isTeacher) {
                return next(new Error("Not have permission"));
            }

            const form = formidable({ multiples: false });
            form.parse(req, async (err, fields, file) => {
                if (err) {
                    next(err);
                    return;
                }
                const scores = await parseScoresFromExcel(file.file);

                // Validate scores
                for (const score of scores) {
                    const scoreNum = Number(score.Grade);
                    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
                        return next(new Error("Score not valid"));
                    }
                    score.StudentId = String(score.StudentId);
                    score.Grade = scoreNum;
                    score.ScoreBasedWeight = scoreNum * grade.weight / 10;
                }
                const resp = {};
                scores.forEach(score => resp[score.StudentId] = score.Grade);
                //Save score
                await scoresService.updateScoreList(gradeId, scores);
                console.log(scores);
                res.json({
                    isSuccess: true,
                    data: resp,
                    message: "Update score list successfully"
                })
            });
        } catch (err) {
            next(err);
        }
    }

    async exportScores(req, res, next) {
        try {
            const classId = req.params.classId;
            const room = await scoresService.findRoomById(classId);
            if (!room) {
                return next(new Error("Not found grade"));
            }

            const isTeacher = await scoresService.checkRoleInClass(classId, req.user.id, ClassRole.TEACHER);

            if (!isTeacher) {
                return next(new Error("Not have permission"));
            }

            const fileStream = await ExportScoresToExcel(room);

            //Send file to Client
            fileStream.pipe(res);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new scoresController();