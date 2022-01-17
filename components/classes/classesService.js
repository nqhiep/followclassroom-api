const db = require('../../models/index');
const { Classes, User_Class, Users } = db;

module.exports.classesCategory = async function (userId) {
    const classes = await User_Class.findAll({
        where: {
            user_id: userId
        },
        include: Classes
    });
    return classes;
}

module.exports.classList = async function () {
    const classes = await Classes.findAll();
    return classes;
}

module.exports.findClassbyId = async function (id) {
    const clss = await Classes.findOne({
        where: { 'id': id }
    });
    return clss;
}

module.exports.updateClassCode = async function (class_id, code) {
    await Classes.update(
        { code: code },
        { where: { id: class_id } },
    );
}

module.exports.createData = async function (data) {
    await Classes.create(data);
}

module.exports.createUserClass = async function (data) {
    await User_Class.create(data);
}

module.exports.createUserClassbyCode = async (user_id, classCode) => {
    let rolebylink = 'student';
    let user = await Users.findOne({ where: { 'id': user_id } });
    let clss = await Classes.findOne({ where: { 'code': classCode } });

    if (clss && user) {
        let user_clss = await User_Class.findOne({
            where:{
                'class_id': clss.id,
                'user_id': user.id
            }
        })
        
        if (!user_clss) {
            const userclass = await User_Class.create({
                class_id: clss.id,
                user_id: user.id,
                role: rolebylink
            });
    
            return userclass;
        }
    }

    return null;
}