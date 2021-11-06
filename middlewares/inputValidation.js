
function InputValidate(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.json({
                status: "FAIL",
                message: error.message
            })
        }
    }
}

module.exports = InputValidate;