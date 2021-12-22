const gradeBoardService = require('./gradeBoardService');

class gradeBoardController {
    async showCategory(req, res) {
        const classId = req.params.classid;
        try {
            res.json(await gradeBoardService.GetGradeBoard(classId));
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