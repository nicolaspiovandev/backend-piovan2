const Contenedor = require('./script.js')
const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send('<h1 style="color:red;">Hello world</h1>')
})

const Contenedor = new Contenedor('products2')

app.get("/products", async (req, res) => {
    let response;
    try {
        response = await contenedor.getAll();
    } catch (e) {
        console.error(e);
    }

    res.send(response);
    res.send('Los productos de la lista son:' + JSON.stringify(response));
});

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))