import mongoose from 'mongoose'

const estudiantes = [
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
    { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
    { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
    { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
    { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
    { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
    { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true},
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true},
    curso: { type: String, required: true },
    nota: { type: Number, required: true }
})

const EstudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

//OTRA MANERA MAS SENCILLA para agregar de a uno solo: 
/* 
const EstudiantesModel = mongoose.model('estudiantes', estudianteSchema)
const estudiante1 = { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 }
try {
    const estudianteSaveModel = EstudiantesModel(estudiante1)
    await estudianteSaveModel.save()
} catch(error) {
    console.log(error)
}
*/

// => conectar a mongo atlas
// await mongoose.connect('mongodb+srv://FlorHnatiuk:<password>@cluster0.yfgtgod.mongodb.net/>>NOMBRE DE LA BASE <<?retryWrites=true&w=majority')
await mongoose.connect('mongodb://localhost/colegio', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada')

const inserciones = []

for (const estudiante of estudiantes) {
    inserciones.push(EstudiantesDAO.create(estudiante))
}

const results = await Promise.allSettled(inserciones)
const rejected = results.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log(rejected)
} else {
    console.log('OK')
}

await mongoose.disconnect()

//Levantar server 
// => simbolo del sistema
// => 1ro mongod
// => 2do mongod --dbpath "path de la db"
// => 3ro chequear conexion con mongosh
// => 4to show dbs
// => 5to use "en este caso colegio"
// => 6to show collections
// => 7mo db.estudiantes.find()

//15 54 911 941