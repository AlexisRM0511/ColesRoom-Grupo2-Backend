const express = require('express')

const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, '..','Frontend','public')))

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/colesroomdb'
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection erro:', err)
})

const usersModel = require('./models/User.js') 

const mostrar = async () => {
    const datitos = await usersModel.find()
    console.log(datitos)
}

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

app.use('/', require('./routes/UserRoute.js'))

const PORT = 3000
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`)
})