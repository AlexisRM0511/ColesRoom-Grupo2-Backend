const express = require('express')
const morgan = require('morgan');
const path = require('path')

const app = express()

// Db connection
const { mongoose } = require('./database');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// Settings 
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, '..', 'ColesRoom-Grupo2-Frontend', 'public')))

// Routes
app.use('/', require('./routes/UserRoute.js'))
app.use('/', require('./routes/PublicationRoute.js'))
app.use('/', require('./routes/CourseRoute.js'))

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Localhost: ${app.get('port')}`);
});


//const usersModel = require('./models/User.js')
//const coursesModel = require('./models/Course.js')

//const mostrar = async () => {
    //const datitos = await usersModel.find()
    //console.log(datitos)
//}

// mostrar()

// const crear = async () =>{
//     const user = new usersModel({
//         name:'Alexis',
//         email:'alex@rojas.com',
//         password:"alexiscrackx"
//     })
//     const result = await user.save()
//     console.log(result)
// }

// crear()

// const actualizar = async (id) => {
//     const user = await usersModel.updateOne({_id: id}, {
//       $set: {
//         name: '',
//         email: '',
//         password: ''
//       }
//     }) 
//   }
// actualizar("60ea1bc3fbb0231cd0207e57")

//  const eliminar = async (id) => {
//     const user = await usersModel.deleteOne({_id: id})
//     console.log(user)
//   }
// eliminar("60ea1bc74ba8631174609e23") 
