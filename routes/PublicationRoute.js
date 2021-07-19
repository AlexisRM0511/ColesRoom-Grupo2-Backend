const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const publicationsModel = require('../models/Publication.js');

router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, surname, email, password } = req.body;
    
    const emailExists = await userModel.findOne({ email })
    if (emailExists) {
        res.status(404).json({ error: 'auth/email-already-exists' })
    }
    else {
        const user = new usersModel({
            name,
            email,
            surname,
            password
        })
        let idUser = ''
        await user.save().then(u => idUser = u._id);        
        
        res.json({ status: 'ok', id: idUser })       
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