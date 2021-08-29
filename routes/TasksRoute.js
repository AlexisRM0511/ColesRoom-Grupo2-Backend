const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const tasksModel = require('../models/Tasks');

router.post('/editTasks', async (req, res) => {
    const { _id } = req.body;

    const aaaas = new Promise(tasksModel.updateOne({ _id: _id }, {
        $set: {
            name: '',
            email: '',
            password: ''
        }
    }))
    await aaaas
});

module.exports = router;