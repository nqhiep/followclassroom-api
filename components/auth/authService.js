const db = require('../../models/index');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const saltRounds = 10;
const { Users, Tokens } = db;
const TokenType = require('../../enums/token_type.enum');

module.exports.findById = async function (id) {
  const user = await Users.findOne({
    where: {
      "id": id
    }
  })
  return user;
}

module.exports.findUserByEmail = async function (email) {
  const user = await Users.findOne({
    where: {
      email
    }
  })
  return user;
}

module.exports.isExistEmail = async (email) => {
  const user = await Users.findOne({
    where: {
      email
    }
  })
  return !!user;
}

module.exports.createUser = async (userData) => {
  const hash = bcrypt.hashSync(userData.password, saltRounds);
  const user = await Users.create({
    email: userData.email,
    name: userData.name,
    password: hash,
    is_activated: false
  });

  const createdToken = await this.createToken(user.id, TokenType.ACTIVE_ACCOUNT)

  return { user, createdToken };
}

module.exports.createToken = async (user_id, type) => {
  const token = crypto.randomBytes(20).toString("hex");
  return await Tokens.create({
    token,
    user_id,
    type
  })
}

module.exports.checkCredential = async function (email, password) {
  const user = await Users.findOne({
    where: {
      email
    }
  })
  //tam
  if (!user || !user.password) {
    return false;
  }
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return false;
  }
  return user;
}

module.exports.findOrCreateGGAccount = async (gg_profile) => {
  const email = gg_profile.email;
  const gg_account = gg_profile.id;
  const avatar = gg_profile.picture;
  const name = gg_profile.name;

  let user = await Users.findOne({
    where: {
      email
    }
  })
  if (!user) {
    user = await Users.create({
      gg_account,
      email,
      avatar,
      name,
      is_activated: true
    });
    return user;
  }
  if (user && !user.gg_account) {
    await Users.update({ gg_account, avatar }, {
      where: { email }
    })
    return user;
  }
  return user;
}

module.exports.updateUser = async (id, email, student_id, gg_account, fb_account) => {
  const user = this.findById(id);

  if (!user) return user;

  if (email && !(email === user.email)) {
    await Users.update({ email }, { where: { id } });
  }

  if (student_id && !(student_id === user.student_id)) {
    await Users.update({ student_id }, { where: { id } });
  }

  if (gg_account && !(gg_account === user.gg_account)) {
    await Users.update({ gg_account }, { where: { id } });
  }

  if (fb_account && !(fb_account === user.fb_account)) {
    await Users.update({ fb_account }, { where: { id } });
  }

  return user;
}

module.exports.findToken = async (token, type) => {
  return await Tokens.findOne({
    where: {
      token,
      type
    },
    raw: true
  })
}
module.exports.deleteToken = async (token, type) => {
  return await Tokens.destroy({
    where: {
      token,
      type
    }
  })
}

module.exports.setActivatedAccount = async (user_id, is_activated) => {
  return await Users.update(
    {
      is_activated
    },
    {
      where: {
        id: user_id
      }
    }
  )
}

module.exports.updatePasswordOfUser = async (userId, password) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  const result = await Users.update({ password: hash }, {
    where: {
      id: userId
    }
  });
  return result;
}