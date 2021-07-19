const express = require('express');
const router = express.Router();
const courseModel = require('../models/Course.js')
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');

router.post('/CreateCourse', async (req, res) =>{
    const { name, category, description, userid } = req.body;
    const course = new courseModel({
        name,
        category,
        description,
        userid
    })
    await course.save();        
    
    res.json({ status: 'ok'})
});