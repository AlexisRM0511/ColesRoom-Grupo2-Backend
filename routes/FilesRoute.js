const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
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
    await fileModel.save().then(file => id = file._id);
    res.json({file: fileModel, fileID: id})
});

router.post('/file', async (req, res) => {
    const { files } = req.body;   

    const filesData = await FileModel.find({ _id: { $in: files } });;
    res.json(filesData);
});

router.get('/file/:id', async (req, res) => {
    const { id } = req.params;
    const file = await FileModel.findById(id);
    res.json(file);
});

router.delete('/file/:id/delete', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const fileDeleted = await FileModel.findByIdAndDelete(id);
    //await unlink(path.resolve('./src/public' + fileDeleted.path));
    res.json({status: 'ok'})
});

router.delete('/file/deleteAll', async (req, res) => {
    const { filesIds } = req.body;
    const filesDeleted = await FileModel.deleteMany({_id: { $in: filesIds }});
    //await unlink(path.resolve('./src/public' + fileDeleted.path));
    res.json({status: 'ok'})
});

module.exports = router;