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
    
    await publi.save().then(p => publication._id = p._id)

    res.json(publication)
});

router.put('/api/publications/:id', async (req, res) => {
    const { id } = req.params;    
    const { content, files } = req.body;    
    const publi = await publicationsModel.findByIdAndUpdate(id, {
        $set: {
            content,
            route: files,
        }
    });
    res.json(publi);
});

router.delete('/api/publications/:id', async (req, res) => {

    const { id } = req.params;
    const publi = await publicationsModel.findByIdAndRemove(id);
    console.log(publi)
    res.json(publi);
});

router.get('/api/publications/:idcourse', async (req, res) => {    
    let id = req.params.idcourse;
    let publications = await publicationsModel.find( {course_id: id} );
    res.json(publications);
});




module.exports = router;