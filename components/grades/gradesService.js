const db = require('../../models/index');
const { Grades, Classes } = db;

module.exports.gradesCategory = async function (classId) {
    const grades = await Grades.findAll({
        where: {
            class_id: classId
        }
    });
    return grades;
}

module.exports.findGradebyId = async function (classid, id) {
    const grade = await Grades.findOne({
        where: {
            'id': id,
            'class_id': classid
        }
    });
    return grade;
}

module.exports.createData = async function (data) {
    let result = await Grades.create(data);

    let setup = await Classes.findOne({
        where: {
            'id': data.class_id
        }
    })

    if (setup.grade_order === null) {
        setup.grade_order = [result.id]
    } else {
        setup.grade_order.push(result.id);
    }

    console.log(setup.grade_order)

    await Classes.update({
        grade_order: setup.grade_order
    }, {
        where: {
            id: data.class_id
        },

    })

}

module.exports.deleteData = async function (classid, id) {
    await Grades.destroy({
        where: {
            'id': id,
            'class_id': classid
        }
    })

    let setup = await Classes.findOne({
        where: {
            'id': classid
        }
    })

    let new_setup = setup.grade_order.filter(item => item != id);

    console.log(id)
    console.log(new_setup)

    await Classes.update({
        grade_order: new_setup
    }, {
        where: {
            id: classid
        },

    })
}

module.exports.updateData = async function (class_id, gradeOrder) {
    await Classes.update(
        { grade_order: gradeOrder },
        { where: { id: class_id } },
    );
}

module.exports.updateGrades = async function (class_id, id, name, weight) {

    await Grades.update({
            'name': name,
            'weight': weight
        },{
            where: {
                'class_id': class_id,
                'id': id
            },}
    );
}