const { Router } = require('express');
const routerUser = Router()
const { middleware1, middleware2 } = require('../middlewares')
const { getAll } = require('../controllers/user')

// routerUser.use(middleware2)

routerUser.get('/', getAll)

routerUser.post('/', middleware1, middleware2, (req, res) => {
    res.json({ msg: 'Post user'})
})

routerUser.put('/', (req, res) => {
    res.json({ msg: 'Put user'})
})


module.exports = routerUser;