const classesService = require('./classesService');

function makeid(length) {
    var result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result = result + characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class classesController {
    async showCategory(req, res) {
        const userId = req.user.id;
        try {
            res.json(await classesService.classesCategory(userId));
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
            let data = {
                name: req.body.name,
                description: req.body.description,
                cover: req.body.cover,
                student_link: makeid(50),
                teacher_link: makeid(50),
                code: makeid(7)
            };
            await classesService.createData(data);

            const categories = await classesService.classList();
            const classItem = categories[categories.length - 1];
            const classId = classItem.id;
            let userClass = {
                class_id: classId,
                user_id: req.user.id,
                role: 'teacher',
            };
            await classesService.createUserClass(userClass);

            res.json(
                {
                    isSuccess: true,
                    message: "Create class successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }

    async updateCode(req, res) {
        try {
            classesService.updateClassCode(req.params.id, makeid(7));

            res.json(
                {
                    isSuccess: true,
                    message: "Update successfully!"
                })

        } catch (err) {
            console.error(err);
        }
    }

    async joinClassbyCode(req, res) {
        
        const create = await classesService.createUserClassbyCode(req.user.id, req.body.code);

        if (!create) return res.json({
            isSuccess: false,
            message: "Can not Join Class by this Code"
        })

        return res.json({
            isSuccess: true,
            message: "Join Class successfully"
        })
    }
}

module.exports = new classesController();