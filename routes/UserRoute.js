const express = require('express');
const router = express.Router();
const userModel = require('../models/User.js')

const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');

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


module.exports = router;