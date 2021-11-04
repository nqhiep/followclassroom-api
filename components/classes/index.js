const express = require('express');
const router = express.Router();
const db = require('../../models/index');

router.get('/', async (req, res, next) => {
  try {
    let data = await db.Classes.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});


router.post('/', (req, res, next) => {
  try {
    let data = {
      name: req.body.name,
      description: req.body.description,
      room: req.body.room,
    };
    db.Classes.create(data).then((classItem) => {
      if (classItem) {
        res.json(classItem);
        console.log("Inserted")
      }
      else {
        console.log("Insert failed");
      }
    });
  } catch (err) {
    console.error(err);
  }

})

module.exports = router;
