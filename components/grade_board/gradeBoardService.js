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

module.exports.GetGradeBoardByClassId = async function (classId) {
    const gradeboard = await Grade_Board.findOne({
        where: { class_id: classId },
    });
    return gradeboard;
}

module.exports.createOrUpdateStudent = async function ({ class_id, student_id, fullname }) {
    const studentEntry = await Grade_Board.findOne({
        where: {
            student_id
        }
    });

    if (studentEntry) {
        Grade_Board.update({
            class_id,
            student_id,
            fullname
        }, {
            where: {
                student_id,
            }
        })
        return true;
    }

    await Grade_Board.create({
        class_id,
        student_id,
        fullname
    })
    return true;
}

module.exports.addStudentList = async (data) => {
    const findGradeBoardResult = this.GetGradeBoardByClassId(data[0].class_id);
    if (!findGradeBoardResult) {
        return await Grade_Board.bulkCreate(data);
    }
    else {
        for (student of data) {
            await this.createOrUpdateStudent(student)
        }
    }
}

module.exports.getScoresInAllGrades = async function (classId) {
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