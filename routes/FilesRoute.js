const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const File = require('../models/File');

router.get('/', async (req, res) => {
    const files = await File.find();
    res.render('index', { files });
});

router.post('/upload', async (req, res) => {
    const file = new File();
    file.title = req.body.title;
    file.description = req.body.description;
    file.filename = req.file.filename;
    file.path = '/uploads/' + req.file.filename;
    file.originalname = req.file.originalname;
    file.mimetype = req.file.mimetype;
    file.size = req.file.size;

    await file.save();
    res.json({status: 'ok'})
});

router.get('/file/:id', async (req, res) => {
    const { id } = req.params;
    const file = await File.findById(id);
    res.json(file);
});

router.get('/file/:id/delete', async (req, res) => {
    const { id } = req.params;
    const fileDeleted = await File.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + fileDeleted.path));
    res.json({status: 'ok'})
});

module.exports = router;