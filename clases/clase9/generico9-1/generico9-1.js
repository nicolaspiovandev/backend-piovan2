const express = require('express')
const app = express()

const routerMascotas = express.Router()
const routerPersonas = express.Router()

app.use(express.static('public'))

app.use('/mascotas', routerMascotas)
app.use('/personas', routerPersonas)

routerMascotas.use(express.json())
routerPersonas.use(express.json())
routerMascotas.use(express.urlencoded({ extended: true }))
routerPersonas.use(express.urlencoded({ extended: true }))

////////////////////////////////////////////////////////////////

const mascotas = []

routerMascotas.get('/listar', (req, res) => {
    res.json(mascotas)
})

routerMascotas.post('/guardar', (req, res) => {
    mascotas.push(req.body)
    res.json(req.body)
})

///////////////////////////////////////////////////////////////

const personas = []

routerPersonas.get('/listar', (req, res) => {
    res.json(personas)
})

routerPersonas.post('/guardar', (req, res) => {
    personas.push(req.body)
    res.json(req.body)
})

/////////////////////////////////////////////////////////////////

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`error en el servidor ${error}`))