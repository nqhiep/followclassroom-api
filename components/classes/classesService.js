const db = require('../../models/index');
const { Classes, User_Class } = db;

module.exports.classesCategory = async function (userId) {
    // const classes = await Classes.findAll();
    const classes_n = await User_Class.findAll({
        where: {
            user_id: userId
        },
        include: Classes
    });
    // console.log(classes_n);
    return classes_n;
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

module.exports.createData = async function (data) {
    await Classes.create(data);
}

module.exports.createUserClass = async function (data) {
    await User_Class.create(data);
}