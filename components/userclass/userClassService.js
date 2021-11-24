const db = require('../../models/index');
const { Users, User_Class } = db;

module.exports.getUserByClassId = async function () {
    const userClass = await User_Class.findAll({
        where: {
            class_id: 13
        },
        include: Users
    });
    return userClass;
}
