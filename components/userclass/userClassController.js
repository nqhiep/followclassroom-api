const userClassService = require('./userClassService');

class classesController {
    async showUserClassList(req, res) {
        const classId = req.params.id;
        try {
            return await res.json(await userClassService.getUserByClassId(classId));
        } catch (err) {
            console.error(err);
        }
    }

    async showUserClass(req, res) {
        const classId = req.params.classid;
        const userId = req.params.userid;
        try {
            return await res.json(await userClassService.getUserClass(classId, userId));
        } catch (err) {
            console.error(err);
        }
    }

}

module.exports = new classesController();