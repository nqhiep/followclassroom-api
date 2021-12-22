const gradeBoardService = require('./gradeBoardService');

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
                    
                    student.dataValues[`GD ${grade.id}`] = score?.score;
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
}

module.exports = new gradeBoardController();