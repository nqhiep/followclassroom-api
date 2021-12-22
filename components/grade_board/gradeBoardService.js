const db = require('../../models/index');
const { Grade_Board, Users, Grades, Scores } = db;

module.exports.addGradeBoard = async function (data) {
    data.User = await Users.findOne({
        where: {
            student_id: data.student_id,
        }
    })

    data.user_id = data.User?.id;
    await Grade_Board.create(data);
}

module.exports.GetGradeBoard = async function (classId) {
    const userClass = await Grade_Board.findAll({
        where: { class_id: classId },
        include: [
            {
                model: Users,
            }
        ]
    });

    return userClass;
}

module.exports.getScoresInAllGrades = async function(classId) {
    const grades = await Grades.findAll({
        where: { class_id: classId },
        include: [
            {
                model: Scores,
            }
        ]
    });
    return grades;
}