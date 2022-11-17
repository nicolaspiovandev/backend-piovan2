const http = require('http')

const getMessage = () => {
    const hora = new Date().getHours()
    if (hora >= 6 && hora <= 12) {
        return 'Buenos dias!'
    } else if (hora >= 13 && hora <= 19) {
        return 'Buenas tardes!'
    } else if ((hora >= 20 &&  hora <= 23) || (hora >= 0 && hora <= 5)){
        return 'Buenas noches!'
    }
}

const server = http.createServer((req, res) => {
    res.end(getMessage())
})

const PORT = 5000

const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})