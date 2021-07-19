const express = require('express');
const router = express.Router();
const coursesModel = require('../models/Course.js')
const userModel = require('../models/User.js')
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');

router.post('/CreateCourse', async (req, res) => {
    const { name, category, description, user_id } = req.body;
    const course = new coursesModel({
        name,
        category,
        description,
        user_id
    })
    console.log(user_id)
    
    let course_id = ""
    await course.save().then(u => course_id = u._id);

    /*const teacher_id = course.user_id
    userModel.updateOne({ _id: teacher_id }, {
        $set: {
            coursescreated: [course_id]
        }
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el cliente',
                err
            });
        } else {
            res.json({
                resultado: true,
                info: info,
                
            })
        }
    })*/
    res.json({ status: 'ok' })
});
module.exports = router;