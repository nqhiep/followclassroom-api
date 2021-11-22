const db = require('../../models/index');
const { Classes } = db;

module.exports.classesCategory = async function() {
    const classes = await Classes.findAll();
    return classes;
}

module.exports.findClassbyId = async function(id) {
    const clss = await Classes.findOne({
        where: {'id': id}
    });
    return clss;
}

module.exports.createData = async function(data) {
    Classes.create(data);
}