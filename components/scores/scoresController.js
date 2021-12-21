const scoresService = require('./scoresService');
const ClassRole = require('../../enums/class_role.enum');

class scoresController {
    async updateSpecificScore(req, res, next) {
        const {studentId, score} = req.body;
        const gradeId = req.params.gradeId;
        const grade = await scoresService.findGradeById(gradeId);
        if(!grade) {
            return next(new Error("Not found grade"));
        } 

        const isTeacher = await scoresService.checkRuleInClass(grade.class_id, req.user.id, ClassRole.TEACHER);

        if(!isTeacher) {
            return next(new Error("Not have permission"));
        }

        const scoreBasedWeight = score * grade.weight / 10;
        await scoresService.createOrUpdateSpecificScore(gradeId, studentId, score, scoreBasedWeight);

        res.json({
            isSuccess: true,
            message: "Update score successfully"
        })
    }
}

module.exports = new scoresController();