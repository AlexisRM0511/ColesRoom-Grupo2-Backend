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
  const courses = new Promise(coursesModel.find())
  await courses
  res.json(courses);
});

// GET Course
router.get("/api/courses/:id", async (req, res) => {
  const course = new Promise(coursesModel.findById(req.params.id))
  await course
  res.json(course);
});

//GET Courses Created
router.get("/api/courses/created/:id", async (req, res) => {
  const user = new Promise(userModel.findById(req.params.id))
  await user
  var coursesList = [];
  for (const courseID of user.coursecreated) {
    const course = new Promise(coursesModel.findById(courseID))
    await course
    coursesList.push(course);
  }
  res.json(coursesList);
});

//GET My Courses
router.get('/api/courses/join/:id', async (req, res) => {
  const user = new Promise(userModel.findById(req.params.id))
  await user
  let coursesList = [];

  for (const courseID of user.mycourses) {
    const course = new Promise(coursesModel.findById(courseID))
    await course
    coursesList.push(course);
  }
  res.json(coursesList);
});

//GET My Courses
router.get('/api/course/join/:id', async (req, res) => {
  const user = new Promise(userModel.findById(req.params.id))
  await user
  console.log(user.mycourses)
  res.json(user.mycourses)
});

//Join Course
router.post("/api/join", async (req, res) => {
  const { userID, courseID } = req.body;
  let newMyCourses = [];
  const userj = new Promise(userModel.findById(userID).then((u) => {
    newMyCourses = u.mycourses;
    newMyCourses.push(courseID);
  }))
  await userj
  const userg = new Promise(userModel.findByIdAndUpdate(userID, {
    $set: {
      mycourses: newMyCourses,
    },
  }))
  await userg
  res.json({ status: "Se unio!" });
})
//add Student
router.post("/api/add", async (req, res) => {
  let studentID = null;
  let newarray = [];
  const { Email, courseID } = req.body;
  const usera = new Promise(userModel.findOne({ email: Email }).then((u) => {
    if (u == {}) {
      studentID = 0;
    } else {
      studentID = u._id;
    }
  }))
  await usera
  if (studentID != 0) {
    const ola1 = new Promise(coursesModel.findById(courseID).then((u2) => {
      newarray = u2.students;
      newarray.push(studentID);
    }))
    await ola1
    const olas = new Promise(oursesModel.findByIdAndUpdate(courseID, {
      $set: {
        students: newarray,
      },
    }))
    await olas
    let newMyCourses = [];
    const ol = new Promise(userModel.findById(studentID).then((u4) => {
      newMyCourses = u4.mycourses;
      newMyCourses.push(courseID);
    }))
    await ol
    const as = new Promise(userModel.findByIdAndUpdate(studentID, {
      $set: {
        mycourses: newMyCourses,
      },
    }))
    await as
    res.json({ status: "Se unio!" });
    res.json({ status: "terminado!" });
    console.log(newarray);
    console.log(studentID);
  } else {
    console.log("no existe usuario");
  }
});

//CREATE Course  
router.post('/api/CreateCourse', async (req, res) => {
  const { name, category, description, image, user_id } = req.body;
  const course = new coursesModel({ name, category, description, user_id, image })
  let newCoursesCreated = []
  let courseID
  const awaw = new Promise(course.save().then(async c => courseID = c._id))
  await awaw
  const asw = new Promise(userModel.findById(course.user_id).then(u => {
    newCoursesCreated = u.coursecreated
    newCoursesCreated.push(courseID)
  }))
  await asw
  const ewe = new Promise(userModel.findByIdAndUpdate(course.user_id, {
    $set: {
      coursecreated: newCoursesCreated
    }
  }))
  await ewe
  res.json({ status: 'Curso Creado!' })
});

// UPDATE Course
router.put("/api/courses/:id", async (req, res) => {
  const { name, description, image, category } = req.body;
  const c = new Promise(coursesModel.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      category,
      description,
      image,
    },
  }))
  await c
  res.json(c)
});

// DELETE Course
router.delete("/api/courses/:id", async (req, res) => {
  const course = new Promise(coursesModel.findById(req.params.id))
  await course
  let newCoursesCreated = [];
  const awaw = new Promise(userModel.findById(course.user_id).then((u) => {
    newCoursesCreated = u.coursecreated;
    let i = newCoursesCreated.indexOf(req.params.id);
    if (i !== -1) {
      newCoursesCreated.splice(i, 1);
    }
  }))
  await awaw
  const awawaw = new Promise(userModel.findByIdAndUpdate(course.user_id, {
    $set: {
      coursecreated: newCoursesCreated,
    },
  }))
  await awawaw
  let newMyCourses = [];
  const users = new Promise(userModel.find())
  await users
  for (const user of users) {
    let i = user.mycourses.indexOf(req.params.id);
    if (i !== -1) {
      newMyCourses.splice(i, 1);
    }
    const aswww = new Promise(userModel.findByIdAndUpdate(user._id, {
      $set: {
        mycourses: newMyCourses,
      },
    }))
    await aswww
  }
  const assss = new Promise(coursesModel.findByIdAndRemove(req.params.id))
  await assss
  const deletedPublications = new Promise(publicationModel.find({
    course_id: req.params.id,
  }))
  await deletedPublications
  const aaaaaaa = new Promise(publicationModel.deleteMany({ course_id: req.params.id }))
  await aaaaaaa
  console.log(deletedPublications);
  res.json(deletedPublications);
})

module.exports = router;
