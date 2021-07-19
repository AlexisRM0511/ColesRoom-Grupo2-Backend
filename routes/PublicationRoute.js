const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //Usar despues para encriptar passwords
const { response } = require('express');
const publicationsModel = require('../models/Publication.js');

router.post('/api/publications', async (req, res) => {
    const { content, type, route, course_id } = req.body;
    const publi = new publicationsModel({
        course_id,
        type,
        content,        
        route       
    });
    
    await publi.save()

    res.json({ status: 'ok'})
});

router.post('/editPubli', async (req, res) => {
});

router.post('/deletePubli', async (req, res) => {
});

router.get('/api/publications/:id', async (req, res) => {    
    let id = req.params.id;
    let publications = await publicationsModel.findById(id);
    res.json({status: 'ok', publications: publications});
});




module.exports = router;