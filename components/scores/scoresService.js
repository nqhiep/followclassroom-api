const db = require('../../models/index');
const { Scores, Grades, User_Class } = db;

module.exports.findGradeById = async function (gradeId) {
    const grade = await Grades.findOne({
        where: {
            'id': gradeId
        }
    });
    return grade;
}

module.exports.checkRuleInClass = async function(classId, userId, role) {
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
