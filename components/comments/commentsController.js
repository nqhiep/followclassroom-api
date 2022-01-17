const commentsService = require('./commentsService');
const reviewsService = require('../reviews/reviewsService');

class CommentsController {
    async createComment(req, res, next) {
        try {
            const { review_id } = req.params;

            const review = await reviewsService.findOneReview(review_id);
            if (!review) { return next(new Error("Not found review")); }

            let data = {
                review_id: review_id,
                user_id: req.user.id,
                content: req.body.content,
            };

            await commentsService.createNewComment(data);
            return res.json(
                {
                    isSuccess: true,
                    message: "Create comment successfully!"
                })

        } catch (err) {
            return next(err);
        }
    }

    async viewList(req, res, next) {
        try {
            const { review_id } = req.params;

            return res.json(await commentsService.commentsCategory(review_id));

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new CommentsController();
