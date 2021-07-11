const express = require('express');
const router = express.Router();
const userModel = require('../models/User.js')
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const usersModel = require('../models/User.js');

// ADD a new task

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await userModel.findOne({ email })
    if (!userExists) {
        res.status(404).json({error: 'auth/user-not-found'})
    }
    else {
        const correctPass = await userModel.findOne({ password })
        if (!correctPass) {
            res.status(404).json({error: 'auth/wrong-password'})
        }
        else {
            res.json({status: 'ok'})
        }
    }        
});

router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    const nameExists = await userModel.findOne({ name })
    if (nameExists) {
        res.status(404).json({error: 'auth/name-already-in-use'})
    }
    else {
        const emailExists = await userModel.findOne({ email })
        if (emailExists) {
            res.status(404).json({error: 'auth/email-already-exists'})
        }
        else {
            const user = new usersModel({
                name,
                email,
                password
            })
            await user.save()
            res.json({status: 'ok'})
        }
    }
    
    // user.save()
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
    //         res.json(err)
    //     })

});

module.exports = router;