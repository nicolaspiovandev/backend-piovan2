const express = require('express');
const app = express();

//RUTA RAIZ
app.get('/', (req, res) => {
    res.send('<h1 style="color:green;">Hello Express server</h1>')
})

let visitas = 0
app.get('/visitas', (req, res) => {
    res.send(`<h1 style="color:green;">La cantidad de visitas es ${++visitas}</h1>`)
})

app.get('/fyh', (req, res) => {
    res.send({fyh: new Date().toLocaleString()})
})

const PORT = process.env.PORT || 3002 

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en el servidor ${error}`))