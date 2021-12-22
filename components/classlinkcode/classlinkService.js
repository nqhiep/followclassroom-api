const db = require('../../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Users, User_Class, Classes } = db;

module.exports.findById = async function (id) {
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

    let user = await Users.findOne({
        where: {
            email
        }
    })
    if (!user) {
        user = await Users.create({
            gg_account,
            email,
            avatar
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

module.exports.findByLink = async (classlink) => {
    let clss = await Classes.findOne({ where: { 'student_link': classlink } });
    if (!clss) {
        clss = await Classes.findOne({ where: { 'teacher_link': classlink } });
    }

    if (clss) { return clss; }

    return null;
}

module.exports.findRoleByLink = async (classlink) => {
    let clss = await Classes.findOne({ where: { 'student_link': classlink } });
    if (!clss) {
        clss = await Classes.findOne({ where: { 'teacher_link': classlink } });
    } else {
        return 'student';
    }

    return 'teacher';
}

module.exports.findExistUserInClass = async (user_id, class_id, role) => {
    return await User_Class.findOne({
        where: {
            user_id,
            class_id,
            //role
        }
    });
}

module.exports.createUserClass = async (userEmail, classlinkId) => {
    let rolebylink = 'student';
    let user = await Users.findOne({ where: { 'email': userEmail } });
    let clss = await Classes.findOne({ where: { 'student_link': classlinkId } });
    if (!clss) {
        clss = await Classes.findOne({ where: { 'teacher_link': classlinkId } });
        rolebylink = 'teacher';
    }

    if (clss && user) {
        const userclass = await User_Class.create({
            class_id: clss.id,
            user_id: user.id,
            role: rolebylink
        });

        return userclass;
    }

    return null;
}