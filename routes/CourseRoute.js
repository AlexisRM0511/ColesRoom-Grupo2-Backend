const express = require('express');
const router = express.Router();
const courseModel = require('../models/Course.js')
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');

router.post('/createCourse', async (req, res) =>{
    const { name, category, description } = req.body;
    const course = new courseModel({
        name,
        category,
        description
    })
    let idCourse = ''
    await course.save().then(u => idCourse = u.id);        
    
    res.json({ status: 'ok', id: idCourse })
});