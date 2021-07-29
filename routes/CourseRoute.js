const express = require('express');
const router = express.Router();

//imports Models
const coursesModel = require('../models/Course.js')
const publicationModel = require('../models/Publication.js')
const taskModel = require('../models/Tasks.js')
const fileModel = require('../models/File.js')

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
    let rdmImg = Math.floor(Math.random() * 3) + 1;
    rdmImg = 'f' + rdmImg;
    const course = new coursesModel({ name, category, description, user_id, image : rdmImg })
    await course.save().then(u => course_id = u._id)
    res.json({ status: 'Curso Creado!' })
});

// UPDATE Course
router.put('/api/courses/:id', async (req, res) => {
    const { name, description, image, category } = req.body;    
    const c = await coursesModel.findByIdAndUpdate(req.params.id, { 
        $set: { 
            name, 
            category,                
            description, 
            image,             
        }
    });       
   
    res.json(c);
});

// DELETE Course
router.delete('/api/courses/:id', async (req, res) => {
    await coursesModel.findByIdAndRemove(req.params.id);
    const deletedPublications = await publicationModel.find({ course_id: req.params.id });
   await publicationModel.deleteMany({ course_id: req.params.id });
    //await taskModel.deleteMany({ course_id: req.params.id });
    console.log(deletedPublications);
    res.json(deletedPublications);
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