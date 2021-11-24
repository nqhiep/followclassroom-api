const userClassService = require('./userClassService');

class classesController {
    async showUserClassList(req, res) {
        // const classId = req.
        try {
            res.json(await userClassService.getUserByClassId());
        } catch (err) {
            console.error(err);
        }
    }

}

module.exports = new classesController();