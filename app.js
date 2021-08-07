const express = require('express')
const morgan = require('morgan');
const path = require('path')

const app = express()
app.disable("x-powered-by");
const uuid = require('uuid');
const { format } = require('timeago.js');
require("dotenv").config();

const mongoose = require('mongoose');
const cors = require('cors');

let corsOptions = {
    origin: 'trustedwebsite.com' // Compliant
};

const dbName = "test"
// Db connection
const uri = `mongodb+srv://prueba_prueba:prueba_prueba@clustercolesroom.owdjh.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Settings 
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, '..', 'ColesRoom-Grupo2-Frontend', 'public')))

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

