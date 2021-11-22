var passport = require('./passport');

const whiteRoute = [
    '/api/sign-up',
    '/api/sign-in',
    '/api/auth/google',
    '/api/secret',
    '/classlink/:linkid/sign-up',
    '/classlink/:linkid/sign-in',
    '/classlink/:linkid/auth/google'
]

function checkWhiteRoute(route, whiteRoute) {
    return whiteRoute.some(white_route => route.indexOf(white_route) === 0);
}

const authentication = (req, res, next) => {
    if(checkWhiteRoute(req.url, whiteRoute)) {
       return next();
    } 

    return passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = authentication;