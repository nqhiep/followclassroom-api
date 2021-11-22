const db = require('../../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Users } = db;

module.exports.findById = async function(id) {
    const user = await Users.findOne({
        where: {
            "id": id
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
        password: hash
    });
    return user;
}

module.exports.checkCredential = async function(email, password) {
    const user = await Users.findOne({
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

module.exports.findOrCreateGGAccount = async (gg_profile) => {
    const email = gg_profile.email;
    const gg_account = gg_profile.id;
    const avatar = gg_profile.picture;

    let user = await Users.findOne({
        where: {
            email 
        }
    })
    if(!user) {
        user = await Users.create({
            gg_account,
            email,
            avatar
        });
        return user;
    }
    if(user && !user.gg_account) {
        await Users.update({ gg_account, avatar }, {
            where: { email }
        })
        return user;
    }
    return user;
}