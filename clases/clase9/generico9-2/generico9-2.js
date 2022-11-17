const express = require('express')
import multer from 'multer'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage})

app.post('/subir', upload.single('miArchivo'), (req, res, next) => {
    const file = req.file
    console.log(file)
    if(!file) {
        const error = new Error('Unable to upload')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`error en el servidor ${error}`))