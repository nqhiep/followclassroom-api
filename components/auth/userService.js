const db = require('../../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = db;

module.exports.findById = async function(id) {
    const user = await User.findOne({
        where: {
            id
        }
    })
    return user;
}

module.exports.isExistEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email
        }
    })
    return !!user;
}

module.exports.createUser = async (userData) => {
    const hash = bcrypt.hashSync(userData.password, saltRounds);
    const user = await User.create({
        email: userData.email,
        password: hash
    });
    return user;
}

module.exports.checkCredential = async function(email, password) {
    const user = await User.findOne({
        where: {
            email
        }
    })
    //tam
    if(! user || !user.password) {
        return false;
    }
    if(!user || !bcrypt.compareSync(password, user.password)) {
        return false;
    }
    return user;
}