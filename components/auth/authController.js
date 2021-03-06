var jwt = require('jsonwebtoken');
const authService = require('./authService');
const { JWT_SECRET } = require('../../config/authentication');
const TokenType = require('../../enums/token_type.enum');
const nodeMailer = require('../../util/nodeMailer');
const AppError = require('../../util/AppError');

const encodedToken = (userId) => {
  return jwt.sign({
    iss: "followclassroom",
    sub: userId,
  }, JWT_SECRET, {
    expiresIn: '30d'
  })
}

class AuthController {
  async signUp(req, res, next) {
    try {
      const isExist = await authService.isExistEmail(req.body.email);
      if (isExist) return res.json({
        isSuccess: false,
        message: "Email already in use!"
      });

      const { createdToken } = await authService.createUser(req.body);
      const activatedLink = process.env.FE_LINK + '/account/active/' + createdToken.token;

      const mailOptions = {
        from: 'FollowClassRoom',
        to: req.body.email,
        subject: 'Activate you account FollClassroom!',
        html: '<div>' +
          '<h1>Xin Chào</h1>' +
          `<p>Bạn nhận được link để kích hoạt tài khoản của bạn!</p>` +
          `<a href='${activatedLink}'>Kích hoạt tại đây</a>` +
          `<p>Trân trọng!</p>` +
          '</div>'
      };

      await nodeMailer.sendMail(mailOptions);

      return res.json(
        {
          isSuccess: true,
          message: "Sign up successfully!"
        }
      );
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res) {
    const token = encodedToken(req.user.id);
    res.json({
      authorization: token,
      isSuccess: true,
      user: req.user,
      message: "Sign in successfully"
    });
  }

  async activeAccount(req, res, next) {
    try {
      const strToken = req.params.token;
      const token = await authService.findToken(strToken, TokenType.ACTIVE_ACCOUNT);
      if (!token) {
        res.json({
          isSuccess: false,
          message: 'Invalid Token'
        })
        return;
      }

      // if (new Date(token.createdAt).getTime() + 900000 < new Date().getTime()) {
      //   authService.deleteToken(strToken, TokenType.ACTIVE_ACCOUNT);
      //   res.json({
      //     isSuccess: false,
      //     message: 'Invalid Token or expired'
      //   })
      //   return;
      // }

      await authService.setActivatedAccount(token.user_id, true);
      authService.deleteToken(strToken, TokenType.ACTIVE_ACCOUNT);

      res.json({
        isSuccess: true,
      })
    } catch (err) {
      next(err);
    }
  }

  async getfromToken(req, res) {
    const user_id = req.user.id;
    if (!user_id) {
      return res.json({
        isSuccess: false,
        message: "Unsuccessfully"
      });
    }

    const userInfor = await authService.findById(user_id);
    res.json({
      isSuccess: true,
      authorization: {
        id: userInfor.id,
        email: userInfor.email,
        gg_acount: userInfor.gg_account,
        fb_account: userInfor.fb_account,
        avatar: userInfor.avatar,
        student_id: userInfor.student_id
      }
    });
  }

  async updUser(req, res) {
    try {
      const isUpdate = await authService.updateUser(
        req.user.id,
        req.body.email,
        req.body.student_id,
        req.body.gg_account,
        req.body.fb_account
      );

      if (!isUpdate) {
        res.json({
          isSuccess: false,
          message: "Unsuccessful"
        });
      }

      res.json({
        isSuccess: true,
        message: "Successful"
      });

    } catch (err) {
      res.json(
        {
          isSuccess: false,
          message: "Server error"
        }
      );
    }
  }

  async getResetPassword(req, res, next) {
    try {
      const email = req.body.email;
      const user = await authService.findUserByEmail(email);

      if (!user) {
        return next(AppError("Not found account with your email!", 400));
      }

      const token = await authService.createToken(user.id, TokenType.RESET_PASSWORD);
      const resetLink = process.env.FE_LINK + '/account/reset-password/' + token.token;

      const mailOptions = {
        from: 'FollowClassRoom',
        to: email,
        subject: 'Reset your password FollClassroom!',
        html: '<div>' +
          '<h1>Xin Chào</h1>' +
          `<p>Bạn nhận được link để cập nhật mật khẩu tài khoản của bạn!</p>` +
          `<a href='${resetLink}'>Cập nhật tại đây</a>` +
          `<p>Trân trọng!</p>` +
          '</div>'
      };

      await nodeMailer.sendMail(mailOptions);

      res.json({
        isSuccess: true
      })
    } catch(err) {
      next(err);
    }
  }

  async checkToken(req, res, next) {
    try {
      const strToken = req.params.tokenId;
      const token = await authService.findToken(strToken, TokenType.RESET_PASSWORD);
      
      if (!token) {
        res.json({
          isSuccess: false,
          message: 'Invalid Token or expired'
        })
        return;
      }

      if (new Date(token.createdAt).getTime() + 900000 < new Date().getTime()) {
        authService.deleteToken(strToken, TokenType.RESET_PASSWORD);
        res.json({
          isSuccess: false,
          message: 'Invalid Token or expired'
        })
        return;
      }

      const userInfo = await authService.findById(token.user_id);

      res.json({
        isSuccess: true,
        user: {
          email: userInfo.email,
          avatar: userInfo.avatar,
        }
      })
    } catch(err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const strToken = req.params.tokenId;
      const token = await authService.findToken(strToken, TokenType.RESET_PASSWORD);
      const password = req.body.password;
      
      if (!token) {
        res.json({
          isSuccess: false,
          message: 'Invalid Token or expired'
        })
        return;
      }

      if (new Date(token.createdAt).getTime() + 900000 < new Date().getTime()) {
        authService.deleteToken(strToken, TokenType.RESET_PASSWORD);
        res.json({
          isSuccess: false,
          message: 'Invalid Token or expired'
        })
        return;
      }

      await authService.updatePasswordOfUser(token.user_id, password);
      authService.deleteToken(strToken, TokenType.RESET_PASSWORD);
      res.json({
        isSuccess: true
      })
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new AuthController();