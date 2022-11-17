const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const frase = 'Hola mundo como están'

app.get('/api/frase', (req, res) => {
    res.send(frase)
})

app.get('/api/letras/:num', (req, res) => {
    const num = parseInt(req.params.num)
    if(isNaN(num)) {
        return res.send({error: 'Invalid: not a number'})
    }
    if (num < 1 || num > frase.length) {
        return res.send({error: 'Invalid: out of range'})
    }
    res.send(frase[num - 1])
})

app.get('/api/palabras/:num', (req, res) => {
    const num = parseInt(req.params.num)
    if(isNaN(num)) {
        return res.send({error: 'Invalid: not a number'})
    }

    const palabras = frase.split(' ')
    if(num < 1 || num > palabras.lenght) {
        return res.send({error: 'Invalid: out of range'})
    }
    res.send(palabras[num - 1])
})

app.get('/ruta', (req, res) => {
    let val = req.query.valor;
    let cod = req.query.codigo;
    let ind = req.query.indice;
    res.send(`El valor es ${val}, código ${cod}, indice ${ind}`)
})
//localhost:3004/ruta?valor=2&ccodigo=29&indice=3

app.post('/test', (req, res) => {
    let obj = req.body;
    res.send(obj)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`error en el servidor ${error}`))