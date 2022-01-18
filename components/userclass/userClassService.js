const db = require('../../models/index');
const { Users, User_Class } = db;

module.exports.getUserByClassId = async function (classId) {
    const userClass = await User_Class.findAll({
        where: {
            class_id: classId
        },
        include: Users
    });
    return userClass;
}

module.exports.getUserClass = async function (classId, userId) {
    const userClass = await User_Class.findAll({
        where: {
            class_id: classId,
            user_id: userId
        },
        include: Users
    });
    return userClass;
}

module.exports.getStudentsByClassId = async function (classId) {
    const userClass = await User_Class.findAll({
        where: {
            class_id: classId,
            role: 'student'
        },
    });
    return userClass;
}

module.exports.getTeachersByClassId = async function (classId) {
    const userClass = await User_Class.findAll({
        where: {
            class_id: classId,
            role: 'teacher'
        },
    });
    return userClass;
}
