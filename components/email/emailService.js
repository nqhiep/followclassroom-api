const db = require('../../models/index');
const { Classes, Users } = db;

module.exports.findClassbyId = async function(id) {
    const clss = await Classes.findOne({
        where: {'id': id}
    });
    return clss;
}

module.exports.findUserbyId = async function(id) {
    const user = await Users.findOne({
        where: {'id': id}
    });
    return user;
}