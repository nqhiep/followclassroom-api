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
                weight: req.body.weight
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

    async updateGradeOrder(req, res) {
        try {
            const class_id = req.params.classid;
            const gradeOrder = req.body;
            await gradesService.updateData(class_id, gradeOrder);

            res.json(
                {
                    isSuccess: true,
                    message: "Update grade successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }

    async updateGrade(req, res) {
        try {

            await gradesService.updateGrades(req.params.classid, req.params.id, req.body.name, req.body.weight);
            res.json(
            {
                    isSuccess: true,
                    message: "Update Grade successfully!"
                })

        } catch (err) {
           console.error(err);
        }
    }
}

module.exports = new gradesController();