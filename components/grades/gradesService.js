const db = require('../../models/index');
const { Grades } = db;

module.exports.gradesCategory = async function (classId) {
    const grades = await Grades.findAll({
        where: {
            class_id: classId
        },
        order: [
            ['order', 'ASC']
        ]
    });
    
    return grades;
}

module.exports.findGradebyId = async function (classid, id) {
    const grade = await Grades.findOne({
        where: { 
            'id': id,
            'class_id': classid
        }
    });
    return grade;
}

module.exports.createData = async function (data) {
    await Grades.create(data);
}

module.exports.deleteData = async function (classid, id) {
    await Grades.destroy({
        where: {
            'id': id,
            'class_id': classid
        }
    })
}