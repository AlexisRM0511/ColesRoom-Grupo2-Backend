const express = require("express");
const router = express.Router();

//imports Models
const coursesModel = require("../models/Course.js");
const userModel = require("../models/User.js");
const publicationModel = require("../models/Publication.js");
const taskModel = require("../models/Tasks.js");
const fileModel = require("../models/File.js");
const { findById } = require("../models/User.js");

//Get All Courses
router.get("/api/courses", async (req, res) => {
  const courses = await coursesModel.find();
  res.json(courses);
});

// GET Course
router.get("/api/courses/:id", async (req, res) => {
  const course = await coursesModel.findById(req.params.id);
  res.json(course);
});

//GET Courses Created
router.get("/api/courses/created/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  var coursesList = [];
  for (const courseID of user.coursecreated) {
    const course = await coursesModel.findById(courseID);
    coursesList.push(course);
  }
  res.json(coursesList);
});

//GET My Courses
router.get('/api/courses/join/:id', async (req, res) =>{
    const user = await userModel.findById(req.params.id)
    console.log(user.mycourses)
    res.json(user.mycourses)
});

//Join Course
router.post("/api/join", async (req, res) => {
  const { userID, courseID } = req.body;
  let newMyCourses = [];
  await userModel.findById(userID).then((u) => {
    newMyCourses = u.mycourses;
    newMyCourses.push(courseID);
  });
  await userModel.findByIdAndUpdate(userID, {
    $set: {
      mycourses: newMyCourses,
    },
  });
  res.json({ status: "Se unio!" });
});

//add Student
router.post("/api/add", async (req, res) => {
  let studentID = null;
  let newarray = [];
  const { Email, courseID } = req.body;
  const userAdd = await userModel.findOne({ email: Email }).then((u) => {

      studentID = u._id;
    }).catch(error => console.error(error));
    const curso = await coursesModel.findById(courseID).then((u2) => {
      newarray = u2.students;
      newarray.push(studentID);
    }).catch(error => console.error(error))
    await coursesModel.findByIdAndUpdate(courseID, {
      $set: {
        students: newarray,
      },
    }).catch(error => console.error(error))
    let newMyCourses = [];
    await userModel.findById(studentID).then((u4) => {
      newMyCourses = u4.mycourses;
      newMyCourses.push(courseID);
    }).catch(error => console.error(error))
    await userModel.findByIdAndUpdate(studentID, {
      $set: {
        mycourses: newMyCourses,
      },
    }).catch(error => console.error(error))
    res.json({ status: "Se unio!" });
    res.json({ status: "terminado!" });
    console.log(newarray);
    console.log(studentID);
  
});

//CREATE Course  
router.post('/api/CreateCourse', async (req, res) => {
    const { name, category, description,image, user_id } = req.body;
    const course = new coursesModel({ name, category, description, user_id, image})
    let newCoursesCreated= []
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
router.put("/api/courses/:id", async (req, res) => {
  const { name, description, image, category } = req.body;
  const c = await coursesModel.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      category,
      description,
      image,
    },
  });

  res.json(c);
});

// DELETE Course
router.delete("/api/courses/:id", async (req, res) => {
  const course = await coursesModel.findById(req.params.id);
  let newCoursesCreated = [];
  await userModel.findById(course.user_id).then((u) => {
    newCoursesCreated = u.coursecreated;
    var i = newCoursesCreated.indexOf(req.params.id);
    if (i !== -1) {
      newCoursesCreated.splice(i, 1);
    }
  });
  await userModel.findByIdAndUpdate(course.user_id, {
    $set: {
      coursecreated: newCoursesCreated,
    },
  });
  let newMyCourses = [];
  const users = await userModel.find();
  for (const user of users) {
    var i = user.mycourses.indexOf(req.params.id);
    if (i !== -1) {
      newMyCourses.splice(i, 1);
    }
    await userModel.findByIdAndUpdate(user._id, {
      $set: {
        mycourses: newMyCourses,
      },
    });
  }
  await coursesModel.findByIdAndRemove(req.params.id);
  const deletedPublications = await publicationModel.find({
    course_id: req.params.id,
  });
  await publicationModel.deleteMany({ course_id: req.params.id });
  //await taskModel.deleteMany({ course_id: req.params.id });
  console.log(deletedPublications);
  res.json(deletedPublications);
});

module.exports = router;
