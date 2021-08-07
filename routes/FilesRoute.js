const { Router } = require('express');

const path = require('path');
const router = Router();

// Models
const FileModel = require('../models/File');

router.post('/upload', async (req, res) => {   
    const { name, size, type} = req.body;
    const fileModel = new FileModel({
        filename: name,
        path: '/uploads/' + name,
        originalname: name,
        mimetype: type,
        size: size,        
    });      
    
    let id = ''
    const asas = new Promise(fileModel.save().then(file => id = file._id))
    await asas
    res.json({file: fileModel, fileID: id})
});


router.post('/file', async (req, res) => {
    const { files } = req.body;
    const filesData = new Promise(FileModel.find({ _id: { $in: files } }))
    await filesData
    res.json(filesData);
});

router.get('/file/:id', async (req, res) => {
    const { id } = req.params;
    const file = new Promise(FileModel.findById(id))
    await file
    res.json(file);
});

router.delete('/file/:id/delete', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const coursesasas = new Promise(FileModel.findByIdAndDelete(id))
    await coursesasas
    res.json({status: 'ok'})
});

router.delete('/file/deleteAll', async (req, res) => {
    const { filesIds } = req.body;
    const asasassa= new Promise(FileModel.deleteMany({ _id: { $in: filesIds } }))
    await asasassa
    res.json({status: 'ok'})
});

module.exports = router;