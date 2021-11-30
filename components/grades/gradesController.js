const gradesService = require('./gradesService');

class gradesController {
    async showCategory(req, res) {
        const classId = req.params.classid;
        try {
            res.json(await gradesService.gradesCategory(classId));
        } catch (err) {
            console.error(err);
        }
    }

    async showGradeById(req, res) {
        const gradeId = req.params.id;
        const classId = req.params.classid;
        try {
            res.json(await gradesService.findGradebyId(classId, gradeId));
        } catch (err) {
            console.error(err);
        }
    }

    async createNewGrade(req, res) {
        const gradelength = await gradesService.gradesCategory(req.params.classid);

        try {
            let data = {
                class_id: req.params.classid,
                name: req.body.name,
                weight: req.body.weight,
                order: gradelength.length + 1
            };
            await gradesService.createData(data);

            res.json(
                {
                    isSuccess: true,
                    message: "Create grade successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }

    async deleteGrade(req, res) {
        try {

            await gradesService.deleteData(req.params.classid, req.params.id);

            res.json(
                {
                    isSuccess: true,
                    message: "Delete Grade successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new gradesController();