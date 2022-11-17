const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/sumar/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params
    res.send({ suma: Number(num1) + Number(num2) })
})

//'/api/sumar/5/6'

app.get('/api/sumar', (req, res) => {
    const { num1, num2 } = req.query
    res.send({ suma: Number(num1) + Number(num2) })
})

//'/api/sumar/?num1=5&num2=62'

app.get('/api/suma/:operacion', (req, res) => {
    const { operacion } = req.params
    res.send({ operacion: eval(operacion) })
})

//'/api/operacion/5+6'

app.post('/api', (req, res) => {
    res.send('Ok post')
})

app.delete('/api', (req, res) => {
    res.send('Ok delete')
})

app.post('/api', (req, res) => {
    res.send('Ok post')
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`error en el servidor ${error}`))