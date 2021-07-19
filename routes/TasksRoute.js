const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const tasksModel = require('../models/Tasks');

router.post('/api/tasks', async (req, res) => {
    const { user_id, publication_id, content, route } = req.body;
    const task = new tasksModel({
        user_id, publication_id, content, route  
    });
    
    await task.save()

    res.json({ status: 'ok'})
});

router.post('/editTasks', async (req, res) => {
    const { user_id, publication_id, content, route,_id } = req.body;

    const user = await tasksModel.updateOne({_id: _id}, {
           $set: {
                 name: '',
                 email: '',
                 password: ''
               }
             }) 
});

router.post('/deleteTasks', async (req, res) => {
    const  {_id} = req.body;
    const user = await tasksModel.deleteOne({_id: id})
    console.log(user)


});

module.exports = router;