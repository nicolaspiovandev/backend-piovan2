const express = require('express')
const routerLog=require('./routes/logRoutes')
const {engine} = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express()

app.use(express.static('public'));
app.use('/',routerLog)
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://fracaroFederico:fracaroFederico@cluster0.viv6icy.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:100000}
}))

app.engine("handlebars",engine())

app.set("view engine","handlebars")
app.set("views","./views")

app.get('/',(req,res)=>{
    res.render('index')
})


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`))