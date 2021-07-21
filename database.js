const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/colesroomdb'
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('La Base de Datos esta conectada'))
    .catch(error => console.error(error));

module.exports=mongoose;