const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const AppError = require('../util/AppError');

const authService = require('../components/auth/authService');
const { JWT_SECRET } = require('../config/authentication');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Authorization");
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await authService.findById(jwt_payload.sub);
    if (user) {
      if (user.isBanned) {
        return done(AppError('Your account is banned!', 401), false);
      }
      return done(null, { id: user.id });
    }
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
      const user = await authService.checkCredential(email, password);
      if (user) {
        if (!user.is_activated) {
          return done(AppError('Account has not been activated!', 401), false);
        }
        if (user.isBanned) {
          return done(AppError('Your account is banned!', 401), false);
        }
        return done(null, { id: user.id, name: user.name, avatar: user.avatar, email: user.email });
      }
      return done(null, false);

    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  }
));



passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = await authService.findOrCreateGGAccount(profile._json);
      if (user.isBanned) {
        return done(AppError('Your account is banned!', 401), false);
      }
      return done(null, { id: user.id, name: user.name, avatar: user.avatar, email: user.email });
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
));


module.exports = passport;
