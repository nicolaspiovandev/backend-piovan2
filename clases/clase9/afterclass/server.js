const express = require('express');
const app = express();
const routerUser = require('./src/routes/user')
const routerProduct = require('./src/routes/product')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', routerUser)
app.use('/api/product', routerProduct)
app.use(express.static('public'))

// Running server
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log("server running"))
server.on('error', error => console.log(error))