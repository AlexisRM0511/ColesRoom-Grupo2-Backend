const express = require('express');
const router = express.Router();

//imports Models
const coursesModel = require('../models/Course.js')

//Get All Courses
router.get('/api/courses', async (req, res) => {
    const courses = await coursesModel.find();
    res.json(courses)
});

// GET Course
router.get('/api/courses/:id', async (req, res) => {
    const course = await coursesModel.findById(req.params.id);
    res.json(course);
  });

//CREATE Course  
router.post('/api/CreateCourse', async (req, res) => {
    const { name, category, description, user_id } = req.body;
    const course = new coursesModel({ name, category, description, user_id })
    await course.save().then(u => course_id = u._id)
    res.json({ status: 'Curso Creado!' })
});

// UPDATE Course
router.put('/api/courses/:id', async (req, res) => {
    const { title, description } = req.body;
    const newCourse = { title, description };
    await coursesModel.findByIdAndUpdate(req.params.id, newCourse);
    res.json({ status: 'Curso Actualizado!' });
});

// DELETE Course
router.delete('/api/courses/:id', async (req, res) => {
    await coursesModel.findByIdAndRemove(req.params.id);
    res.json({ status: 'Curso Eliminado!' });
});


module.exports = router;

/*const teacher_id = course.user_id
    userModel.updateOne({ _id: teacher_id }, {
        $set: {
            coursescreated: [course_id]
        }
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el cliente',
                err
            });
        } else {
            res.json({
                resultado: true,
                info: info,

            })
        }
    })*/