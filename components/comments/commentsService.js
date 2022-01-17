const db = require('../../models/index');
const { Comments, Users } = db;

module.exports.createNewComment = async function (data) {
    const res = await Comments.create(data);
    return res;
}

module.exports.commentsCategory = async function (review_id) {
    const reviews = await Comments.findAll({
        where: { review_id },
        include: {
            model: Users,
        }
    });
    return reviews;
}