const express = require('express')
const { promises: fs } = require('fs')
const app = express()

app.engine('cte', async (filePath, options, callback) => {
    try {
        const content = await fs.readFile(filePath)
        const rendered = content.toString()
            .replace('^^titulo$$', '' + options.titulo + '')
            .replace('^^mensaje$$', '' + options.mensaje + '')
            .replace('^^autor$$', '' + options.autor + '')
            .replace('^^version$$', '' + options.version + '')
            .replace('^^nombre$$', '' + options.nombre + '')
            .replace('^^apellido$$', '' + options.apellido + '')
        return callback(null, rendered)
    } catch (err) {
        return callback(new Error(err))
    }
})

app.set('views', '/views')

app.set('view engine', 'cte')

app.get('/', (req, res) => {
    const datos = { 
        titulo: 'titulo del mensaje',
        mensaje: 'mensaje completo',
        autor: 'coder',
        version: '1.0'
    }
    res.render('plantilla1', datos)
})

app.get('/cte2', (req, res) => {
    let objeto = { nombre: 'Flor', apellido: 'Hnatiuk', version: 2.0}
    res.render('plantilla2', objeto)
})

app.listen(3010)