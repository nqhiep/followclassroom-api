var passport = require('./passport');

const whiteRoute = [
    '/api/sign-up',
    '/api/sign-in',
    '/api/auth/google',
    '/api/secret',
    '/classlink'
]

function checkWhiteRoute(route, whiteRoute) {
    return whiteRoute.some(white_route => route.indexOf(white_route) === 0);
}

const authentication = (req, res, next) => {
    if (checkWhiteRoute(req.url, whiteRoute)) {
        return next();
    }

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = authentication;