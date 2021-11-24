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

}

module.exports = new classesController();