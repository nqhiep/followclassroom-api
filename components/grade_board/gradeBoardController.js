const formidable = require('formidable');
const gradeBoardService = require('./gradeBoardService');
const fileHelper = require('./fileHelper')

class gradeBoardController {
    async showCategory(req, res) {
        const classId = req.params.classid;
        try {
            const studentList = await gradeBoardService.GetGradeBoard(classId);
            const gradeList = await gradeBoardService.getScoresInAllGrades(classId);
            for(const student of studentList) {
                for(const grade of gradeList) {
                    const score = grade.Scores.find(score => 
                        score.student_id == student.student_id);

                    student.dataValues[grade.name] = score?.score;
                }
            }
            res.json(studentList);
        } catch (err) {
            console.error(err);
        }
    }

    async createNew(req, res) {

        try {
            let data = {
                class_id: req.params.classid,
                student_id: req.body.student_id,
                fullname: req.body.fullname,
            };
            await gradeBoardService.addGradeBoard(data);

            res.json(
                {
                    isSuccess: true,
                    message: "Create successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }

    async uploadStudentList(req, res, next) {
        try {
            const classId = req.params.classid;
            const form = formidable({ multiples: false });
            form.parse(req, async (err, fields, file) => {
                if (err) {
                    next(err);
                    return;
                }
                const studentList = await fileHelper.parseDataFromExcel(file.file);
                const customStudentList = studentList.map((student) => {
                    return ({
                        class_id: classId,
                        student_id: String(student.StudentId),
                        fullname: student["Full name"]
                    })
                })

                await gradeBoardService.addStudentList(customStudentList);
                res.json({
                    isSuccess: true,
                    message: "Update Student list successfully"
                })
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new gradeBoardController();