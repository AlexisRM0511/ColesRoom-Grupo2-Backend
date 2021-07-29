const express = require('express');
const router = express.Router();

//imports Models
const coursesModel = require('../models/Course.js')
const userModel = require('../models/User.js')

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

//GET Courses Created
router.get('/api/courses/created/:id', async (req, res) =>{
    const user = await userModel.findById(req.params.id)
    var coursesList = []
    for (const courseID of user.coursecreated) {
        const course = await coursesModel.findById(courseID)
        coursesList.push(course)
    }
    res.json(coursesList)
});

//GET My Courses
router.get('/api/courses/join/:id', async (req, res) =>{
    const user = await userModel.findById(req.params.id)
    let coursesList
    for (const courseID of user.mycourses) {
        const course = await coursesModel.findById(courseID)
        coursesList.push(course)
    }
    res.json(coursesList)
});

//Join Course
router.post('/api/join', async (req, res) => {
    const { userID, courseID} = req.body;
    let newMyCourses
    await userModel.findById(userID).then(u => {
        newMyCourses = u.mycourses
        newMyCourses.push(courseID)
    })
    await userModel.findByIdAndUpdate( userID, {
        $set: {
            mycourses:newMyCourses
        }
    })
    res.json({ status: 'Se unio!' })

});


//CREATE Course  
router.post('/api/CreateCourse', async (req, res) => {
    const { name, category, description, user_id } = req.body;
    const course = new coursesModel({ name, category, description, user_id })
    let newCoursesCreated
    let courseID
    await course.save().then(async c => courseID=c._id)
    await userModel.findById(course.user_id).then(u => {
        newCoursesCreated = u.coursecreated
        newCoursesCreated.push(courseID)
    })
    await userModel.findByIdAndUpdate( course.user_id, {
        $set: {
            coursecreated:newCoursesCreated
        }
    })
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