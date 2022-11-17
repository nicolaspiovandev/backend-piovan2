const express = require('express')
const app = express()

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/datos', (req, res) => {
    let dataObject = req.query;
    res.render('nivel', dataObject);
});

// app.get('/ejemplo/:id/:nombre/:palabra', (req, res) => {
//     let params = req.params;
//     res.render('example', params)
// })

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))