const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const publicationsModel = require('../models/Publication.js');

router.post('/api/publications', async (req, res) => {    
    const publication = req.body;
    const { content, type, route, course_id } = publication;
    const publi = new publicationsModel({
        course_id,
        type,
        content,        
        route       
    });
    const olas= new Promise( publi.save().then(p => publication._id = p._id))
    await olas
    res.json(publication)
});

router.post('/api/tasks', async (req, res) => {    
    const publication = req.body;
    const { content, type, route, course_id } = publication;
    const task = new publicationsModel({course_id, type,content,route});
    const assaas = new Promise( task.save().then(p => publication._id = p._id))
    await assaas
    res.json(publication)
});


router.put('/api/publications/:id', async (req, res) => {
    const { id } = req.params;    
    const { content, files } = req.body;    
    const publi = new Promise( publicationsModel.findByIdAndUpdate(id, {
        $set: {
            content,
            route: files,
        }
    }))
    await publi
    res.json(publi);
});

router.delete('/api/publications/:id', async (req, res) => {

    const { id } = req.params;
    const publi = new Promise(publicationsModel.findByIdAndRemove(id))
    await publi
    res.json(publi);
});

router.get('/api/publications/:idcourse', async (req, res) => {    
    let id = req.params.idcourse;
    let publications = new Promise(publicationsModel.find({ course_id: id }))
    await publications
    res.json(publications);
});

module.exports = router;