const db = require('../../models/index');
const { Notifications } = db;
const userClassService = require('../userclass/userClassService');

module.exports.createNewNoti = async function (data) {
    await Notifications.create(data);
}

module.exports.notiCategory = async function (user_id) {
    const reviews = await Notifications.findAll({
        where: { user_id },
        order: [['createdAt', 'DESC'],]
    });
    return reviews;
}

module.exports.notiUnreadCategory = async function (user_id) {
    const reviews = await Notifications.findAll({
        where: { 
            user_id,
            is_view: false,    
        },
        order: [['createdAt', 'DESC'],]
    });
    return reviews;
}

module.exports.markViewed = async function (id) {
    await Notifications.update(
        { is_view: true },
        { where: { 'id': id } }
    )
}

module.exports.createStudentGradeNoti= async function (class_id, grade_name, class_name) {
    const list = await userClassService.getStudentsByClassId(class_id);
    for (const user of list) {
        await Notifications.create({
            user_id: user.user_id,
            class_id: user.class_id,
            title: 'Cập nhật điểm',
            content: class_name + ': Giảng viên đã cập nhật cột điểm ' + grade_name + ' cho bạn',
            is_view: false,
        })
    };
}

module.exports.createStudentReviewNoti= async function (class_id, grade_name, student_id, class_name) {
    const list = await userClassService.getTeachersByClassId(class_id);
    for (const user of list) {
        await Notifications.create({
            user_id: user.user_id,
            class_id: user.class_id,
            is_view: false,
            title: 'Phúc khảo điểm',
            content: class_name + ': ' + student_id + ' muốn phúc khảo cột điểm ' + grade_name
        })
    };
}

module.exports.createTeacherCommentNoti= async function (class_id, grade_name, student_id, class_name) {
    const list = await userClassService.getTeachersByClassId(class_id);
    for (const user of list) {
        await Notifications.create({
            user_id: user.user_id,
            class_id: user.class_id,
            is_view: false,
            title: 'Comment',
            content: class_name + ': ' + student_id + ' đã comment ở bảng phúc khảo ' + grade_name
        })
    };
}

module.exports.createStudentCommentNoti= async function (class_id, grade_name, user_id, class_name) {
        await Notifications.create({
            user_id: user_id,
            class_id: class_id,
            is_view: false,
            title: 'Comment',
            content: class_name + ': Giảng viên đã comment ở bảng phúc khảo ' + grade_name
        });
}

module.exports.createMarkReviewNoti= async function (class_id, grade_name, user_id, class_name) {

    await Notifications.create({
        user_id: user_id,
        class_id: class_id,
        is_view: false,
        title: 'Review Mark Done',
        content: class_name + ': Giảng viên đã đánh dấu hoành thành xem xét bảng phúc khảo ' + grade_name
    });
}