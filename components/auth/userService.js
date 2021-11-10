const db = require('../../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Users } = db;
console.log(Users);

module.exports.findById = async function(id) {
    const user = await Users.findOne({
        where: {
            id
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
    if(! user || !users.password) {
        return false;
    }
    if(!user || !bcrypt.compareSync(password, users.password)) {
        return false;
    }
    return user;
}

module.exports.findOrCreateGGAccount = async (gg_profile) => {
    let user = await Users.findOne({
        where: {
            gg_account: gg_profile.id
        }
    })
    if(!user) {
        user = await Users.create({
            gg_account: gg_profile.id,
            email: gg_profile.emails[0]?.value,
            avatar: gg_profile.image.url
        });
    }
    return user;
}