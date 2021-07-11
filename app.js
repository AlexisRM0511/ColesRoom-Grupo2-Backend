// const http = require('http')
const express = require('express')
// const routes = require('./routes/index.js')
// require('dotenv').config()

const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, '..','Frontend','public')))

// app.use('/', routes);

/*
    @params
    req: Solicitud al servidor, o sea, la URL
    res: Lo que el servidor mostrará
*/


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
    next()
})


const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/colesroomdb'
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

const usersSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String
})

const usersModel = mongoose.model('users', usersSchema)

const mostrar = async () => {
    const datitos = await usersModel.find()
    console.log(datitos)
}
mostrar()

const crear = async () =>{
    const user = new usersModel({
        name:'Alexis',
        email:'alex@rojas.com',
        password:"alexiscrackx"
    })
    const result = await user.save()
    console.log(result)
}

const actualizar = async (id) => {
    const user = await usersModel.updateOne({_id: id}, {
      $set: {
        name: '',
        email: '',
        password: ''
      }
    }) 
  }
 actualizar("60ea1bc3fbb0231cd0207e57")

 const eliminar = async (id) => {
    const user = await usersModel.deleteOne({_id: id})
    console.log(user)
  }

eliminar("60ea1bc74ba8631174609e23")  

app.get('/abc', async (req, res) => {
    const aa = await mostrar()
    console.log(aa)
    res.json(aa)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`)
})