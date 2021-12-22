const db = require('../../models/index');
const { Grade_Board, User_Class, Users } = db;

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