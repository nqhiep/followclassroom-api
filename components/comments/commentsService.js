const db = require('../../models/index');
const { Comments } = db;

module.exports.createNewComment = async function (data) {
    await Comments.create(data);
}

module.exports.commentsCategory = async function (review_id) {
    const reviews = await Comments.findAll({
        where: { review_id }
    });
    return reviews;
}