const express =require('express')
// const session = require('express-session')
const {Router}=require( 'express')
// const MongoStore = require('connect-mongo')
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const Api = require('../container/apiPord')
const api = new Api()
const routerLog=new Router()
// const app = express()


// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: 'mongodb+srv://fracaroFederico:fracaroFederico@cluster0.viv6icy.mongodb.net/?retryWrites=true&w=majority',
//         mongoOptions: advancedOptions
//     }),
//     secret: 'shhhhhhhhhhhhhhhhhhhhh',
//     resave: false,
//     saveUninitialized: false,
//     cookie:{maxAge:100000}
// }))

routerLog.use(express.json())
routerLog.use(express.urlencoded({ extended: true }))

routerLog.get('/',(req,res)=>{
    console.log(req.session)
    if (req.session.nombre) {
        res.redirect('/login')
    } else {
        res.render("index");
    }
})

routerLog.get('/login',(req,res)=>{
    let completeList=api.getAll()
    res.render("form",{completeList})
})

routerLog.post('/login',(req,res)=>{
    api.save(req.body)
    res.redirect("/login")
})

routerLog.post('/',(req,res)=>{
    const { nombre, password } = req.body
    const usuario = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)
    if (!usuario) {
        return res.render('login-error');
    }
    req.session.nombre = nombre
    req.session.contador = 0
    res.redirect('/login')
})

routerLog.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        res.redirect('/login')
    })
})

module.exports=routerLog