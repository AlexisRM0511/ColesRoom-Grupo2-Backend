const express = require('express')
const morgan = require('morgan');
const path = require('path')

const app = express()
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');
require("dotenv").config();

const mongoose = require('mongoose');

const usuario = "prueba_prueba"
const password = "prueba_prueba"
const dbName = "test"
// Db connection
const uri = `mongodb+srv://prueba_prueba:${password}@clustercolesroom.owdjh.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Settings 
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, '..', 'ColesRoom-Grupo2-Frontend', 'public')))

app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'files/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// Routes
app.use('/', require('./routes/UserRoute.js'))
app.use('/', require('./routes/PublicationRoute.js'))
app.use('/', require('./routes/CourseRoute.js'))
app.use('/', require('./routes/FilesRoute.js'))

// Starting the server
app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`CONNECTED`);
});

