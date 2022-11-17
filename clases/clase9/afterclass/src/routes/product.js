const { Router } = require('express');
const routerProduct = Router()


routerProduct.get('/', (req, res) => {
    res.json({ msg: 'Get product'})
})

routerProduct.post('/', (req, res) => {
    res.json({ msg: 'Post product'})
})

module.exports = routerProduct;