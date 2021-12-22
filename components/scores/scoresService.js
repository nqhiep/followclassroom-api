const db = require('../../models/index');
const { Scores, Grades, User_Class, Classes, Grade_Board } = db;

module.exports.findGradeById = async function (gradeId) {
    const grade = await Grades.findOne({
        where: {
            'id': gradeId
        }
    });
    return grade;
}

module.exports.findRoomById = async function(classId) {
    const room = await Classes.findOne({
        where: {
            id: classId
        }
    });
    return room;
}

module.exports.checkRoleInClass = async function(classId, userId, role) {
    const userClass = await User_Class.findOne({
        where : {
            'class_id': classId,
            'user_id': userId,
            'role': role
        }
    });
    return !!userClass;
}

module.exports.createOrUpdateSpecificScore = async function(gradeId, studentId, score, scoreBasedWeight) {
    const scoreEntry = await Scores.findOne({
        where: {
            grade_id: gradeId,
            student_id: studentId
        }
    });
    
    if(scoreEntry) {
        if(scoreEntry.score != score) {
            Scores.update({
                score,
                score_based_weight: scoreBasedWeight
            }, {
                where: {
                    grade_id: gradeId,
                    student_id: studentId,
                }
            })
        }
        return true;
    }

    await Scores.create({
        grade_id: gradeId,
        student_id: studentId,
        score,
        score_based_weight: scoreBasedWeight
    })
    return true;
}

module.exports.updateScoreList = async (gradeId, scores) => {
    for(score of scores) {
        await this.createOrUpdateSpecificScore(gradeId, score.StudentId, score.Grade, score.ScoreBasedWeight);
    }
    return true;
}

module.exports.getAllStudentsInClass = async (classId) => {
    const allStudentsInClass = await Grade_Board.findAll({
        where: {
           class_id: classId 
        }
    })
    return allStudentsInClass;
}

module.exports.getAllGradesInClass = async (classId) => {
    const allGradesInClass = await Grades.findAll({
        where: {
           class_id: classId 
        }
    })
    return allGradesInClass;
}


