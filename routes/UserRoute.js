const express = require('express');
const router = express.Router();
const userModel = require('../models/User.js')

const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await userModel.findOne({ email })
    if (!userExists) {
        res.status(404).json({ error: 'auth/user-not-found' })
    }
    else {
        const correctPass = await userModel.findOne({ password })
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
});

router.post('/register', async (req, res) => {  
    const { name, surname, email, password } = req.body;
    
    const emailExists = await userModel.findOne({ email })
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
        await user.save().then(u => idUser = u._id);        
        
        res.json({ status: 'ok', id: idUser })       
    }
});

router.get('/teacher/:id', async (req, res) => {   
    const teacher = await userModel.findById(req.params.id);   
    res.json(teacher);
});

router.delete('/user/deleteuser', async (req, res) => {
    const { user_id, course_id } = req.body
    let newMyCourses = [];
    await userModel.findById(user_id).then((u) => {
        newMyCourses = u.coursecreated;
        let i = newMyCourses.indexOf(course_id);
        if (i !== -1) {
            newMyCourses.splice(i, 1);
        }
    })
     await userModel.findByIdAndUpdate(user_id, {
        $set: {
            mycourses: newMyCourses,
        },
    })
    res.json({ status: "HOLA" })
})

module.exports = router;