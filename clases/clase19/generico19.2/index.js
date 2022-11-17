const mongoose = require('mongoose')

/* --------------------------------------------- */
// Definicion del esquema de documento y modelo
// para poder interactuar con la base de datos 
/* --------------------------------------------- */

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
    curso: { type: String, required: true},
    nota: { type: Number, required: true},
})

const EstudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

/* --------------------------------------------- */
// Conexion a la base de datos : colegio
/* --------------------------------------------- */

mongoose.connect('mongodb://localhost/colegio', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log('Base de datos conectada')
        /* Lectura de base de datos : colegio, collection : estudiantes */
        console.log('\n1 Estudiantes ordenados por orden alfabetico segun sus nombres')
        // ---------------------------------------
        EstudiantesDAO.find({}).sort({ nombre: 1 })
            .then(estudiantes => { 
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante));
                })
                // --------------------------------------
                console.log('\n2) El estudiante mas joven')
                // --------------------------------------
                return EstudiantesDAO.find({}).sort({ edad: 1 }).limit(1)
            })
            .then(estudiantes => {
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante));
                })
                //---------------------------------------
                console.log('\n3) Los estudiantes que pertenezcan al curso \'2A\'')
                // --------------------------------------
                return EstudiantesDAO.find({ curso: '2A' })
            })
            .then(estudiantes => {
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante));
                })
                // --------------------------------------
                console.log('\n4) El segundo estudiante mas joven')
                // --------------------------------------
                return EstudiantesDAO.find({}).sort({ edad : 1 }).skip(1).limit(1)
            })
            .then(estudiantes => {
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante));
                })
                // --------------------------------
                console.log('\n5) Solo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente')
                // --------------------------------
                return EstudiantesDAO.find({}, {nombre: 1, apellido: 1, curso: 1, _id: 0}).sort({ apellido: -1}) 
            })
            .then(estudiantes => {
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante))
                })
                //--------------------------------
                console.log('\n6) El estudiante que saco mejor nota')
                // ------------------------------
                return EstudiantesDAO.find().sort({ nota: -1 }).limit(1)
            })
            .then(estudiantes => {
                estudiantes.forEach(estudiante => {
                    console.log(JSON.stringify(estudiante));
                })
                // ------------------------------
                console.log('\n7) El promedio de notas del total de alumnos')
                // -------------------------------
                return EstudiantesDAO.find({})
            }).
            then(estudiantes => {
                let sumNotas = 0
                estudiantes.forEach(estudiante => {
                    sumNotas += estudiante.nota
                })
                console.log(`Promedio: ${(sumNotas / estudiantes.length).toFixed(2)}`)
            })
            // ------------------------------
            console.log('\n8) El promedio de notas del curso')
            //------------------------------
            return EstudiantesDAO.find({ curso: '1A'})
    })
    .then(estudiantes => {
        let sumNotas = 0
        estudiantes.forEach(estudiante => {
            sumNotas += estudiante.nota
        })
        console.log(`Promedio: ${(sumNotas / estudiantes.length).toFixed(2)}`)
    })
    .catch(err => {throw new Error(`Error en lectura ${err}`)})
    .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('Error al desconectar la base de datos')})
    })
    .catch(err => {throw new Error('Error de conexion a la base de datos')})
