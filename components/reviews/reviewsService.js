const db = require('../../models/index');
const { Grades, Scores, Grade_Review } = db;

module.exports.findOneScore = async function (grade_id, user_id) {
    const score = await Scores.findOne({
        where: {
            'grade_id': grade_id,
            'user_id': user_id
        }
    })
    return score;
}

module.exports.findOneReview = async function (id) {
    const review = await Grade_Review.findOne({
        where: { id }
    })
    return review;
}

module.exports.createNewReview = async function (data) {
    await Grade_Review.create(data);
}

module.exports.teacherReviewsCategory = async function (class_id) {
    const reviews = await Grade_Review.findAll({
        include: {
            model: Scores,
            include: {
                model: Grades,
                where: { class_id }
            }
        }
    });
    return reviews;
}

module.exports.studentReviewsCategory = async function (class_id, user_id) {
    const reviews = await Grade_Review.findAll({
        include: {
            model: Scores,
            where: { user_id },
            include: {
                model: Grades,
                where: { class_id }
            }
        }
    });
    return reviews;
}

module.exports.markReviewDone = async function (id) {
    await Grade_Review.update(
        { is_review_done: true },
        { where: { 'id': id } }
    )
}
