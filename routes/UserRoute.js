const express = require("express");
const router = express.Router();
const userModel = require("../models/User.js");

const bcrypt = require("bcrypt"); //Usar despues para encriptar passwords
const { response } = require("express");

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userExists = new Promise(userModel.findOne({ email }))
    await userExists
    if (!userExists) {
        res.status(404).json({ error: 'auth/user-not-found' })
    }
    else {
        const correctPass = new Promise( userModel.findOne({ password }))
        await correctPass
        if (!correctPass) {
            res.status(404).json({ error: 'auth/wrong-password' })
        }
        else {
            const idUser = correctPass._id
            res.json({
                status: 'ok',
                id: idUser
            })
        }
    }
  }
});


router.post('/register', async (req, res) => {  
    const { name, surname, email, password } = req.body;
    
    const emailExists = new Promise( userModel.findOne({ email }))
    await emailExists
    if (emailExists) {
        res.status(404).json({ error: 'auth/email-already-exists' })
    }
    else {
        const user = new userModel({
            name,
            email,
            surname,
            password
        })
        let idUser = ''
        const awa=new Promise( user.save().then(u => idUser = u._id))
        await awa
        res.json({ status: 'ok', id: idUser })       
    }
});

router.get('/teacher/:id', async (req, res) => {   
    const teacher = new Promise(userModel.findById(req.params.id))
    await teacher
    res.json(teacher);
});

router.delete("/user/deleteuser", async (req, res) => {
  const { user_id, course_id } = req.body;
  let newMyCourses = [];
  await userModel.findById(user_id).then((u) => {
    newMyCourses = u.coursecreated;
    let i = newMyCourses.indexOf(course_id);
    if (i !== -1) {
      newMyCourses.splice(i, 1);
    }
  });
  await userModel.findByIdAndUpdate(user_id, {
    $set: {
      mycourses: newMyCourses,
    },
  });
  res.json({ status: "HOLA" });
});

router.put("/user/updateuser/:id", async (req, res) => {
  const { name, surname, email, phone } = req.body;
  const u = await userModel.findByIdAndUpdate(req.params.id, {
    $set: { name, surname, email, phone },
  });
  res.json(u);
  console.log(req.body, u);
});

module.exports = router;
