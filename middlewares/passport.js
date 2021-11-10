const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const userService = require('../components/auth/userService');
const { JWT_SECRET } = require('../config/authentication');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Authorization");
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await userService.findById(jwt_payload.sub);
        if (user) return done(null, { id: user.id });
        done(null, false);
    } catch (err) {
        done(err, false);
    }
}));

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    async function (email, password, done) {
        try {
            const user = await userService.checkCredential(email, password);
            if (user) {
                return done(null, { id: user.id });
            }
            return done(null, false);

        } catch (err) {
            return done(err, false)
        }
    }
));


passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await userService.findOrCreateGGAccount(profile._json);
        return done(null, { id: user.id });
    } catch (err) {
        console.log(err);
        done(err, false);
    }
}));

module.exports = passport;
