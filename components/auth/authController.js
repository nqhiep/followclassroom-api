
class AuthController {
    async signUp(req, res, next) {
        console.log(req.body);
        
        
        res.json({oke: "oke"});
    }
}

module.exports = new AuthController();