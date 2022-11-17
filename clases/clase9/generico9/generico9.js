const express = require('express')
const app = express()
const { Router } = require('express')

const routerMascotas = Router()
const routerPersonas = Router()

app.use(express.static('public'))

app.use('/mascotas', routerMascotas)
app.use('/personas', routerPersonas)

routerMascotas.use(express.json())
routerPersonas.use(express.json())

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

const PORT = 3006

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`error en el servidor ${error}`))