const classesService = require('./classesService');
const { JWT_SECRET } = require('../../config/authentication');

function makeid(length) {
        var result             = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
        result = result + characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

class classesController {
    async showCategory(req, res) {
        try {
            res.json(await classesService.classesCategory());
        } catch (err) {
            console.error(err);
        }
    }

    async showClassById(req, res) {
        try {
            res.json(await classesService.findClassbyId(req.params.id));
        } catch (err) {
            console.error(err);
        }
    }

    async createNewClass(req, res) {
        try {
            const categories = await classesService.classesCategory();
            let data = {
                id: categories.length + 1,
                name: req.body.name,
                description: req.body.description,
                cover: req.body.cover,
                student_link: makeid(50),
                teacher_link: makeid(50)
            };
            await classesService.createData(data);
            res.json('Khai báo thành công');
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = new classesController();