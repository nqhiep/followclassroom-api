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
