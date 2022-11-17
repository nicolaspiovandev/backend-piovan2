import mongoose from 'mongoose'
import * as model from '../models/usuario.js'

CRUD()

async function CRUD() { 
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    }
    catch (error) {
        console.log(`Error de conexión a la base de datos`)
    }
} 

// Create

console.log('Create')
const usuario = { nombre: 'Juan', apellido: 'Perez', email: 'jp@gmail.com', password: '12345'}
const usuarioSaveModel = new model.usuarios(usuario)
let usuarioSave = await usuarioSaveModel.save()
console.log(usuarioSave)

// Read

console.log('Read')
let usuarios = await model.usuarios.find({})
console.log(usuarios)