const express = require('express');
const app = express();
const fs = require('fs');

class Contenedor{
    constructor(archive){
        this.archive = archive;
    }

    async save(product){
        let productsObj = await this.getAll();
        productsObj.push(product);
        await fs.promises.writeFile(this.archive, JSON.stringify(this.productsObj, null, 2));
    }
    
    async getAll(){
        let productsDb = await fs.promises.readFile(this.archive);
        let productsObj = JSON.parse(productsDb);
        return productsObj;
    }

    async getById(id){
        let productsDb = await this.getAll()
        let product = await productsDb.find((prod) => prod.id == id)
        console.log(product)
        return product
    }

    async deleteById(id){
        let productsDb = await this.getAll();
        let newList = productsDb.filter((prod) => prod.id !== id);
        console.log(newList);
        await fs.promises.writeFile(this.archive, JSON.stringify(newList));
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, '[]');
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }
}

const contenedor = new Contenedor('products.txt');

const getProducts = async () => {
    listProducts = JSON.stringify(await contenedor.getAll());
    return listProducts;
}

const getProductRandom = async (min, max) => {
    let id = Math.floor(Math.random() * (max - min) + min)
    let randomProduct = JSON.stringify(await contenedor.getById(id));
    return randomProduct;
}

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenido</h1>`);
})

app.get('/products',async (req, res) => {
    res.send(`<h1>Nuestras computadoras:</h1> ${await getProducts().catch("Error")}`);
})

app.get('/randomProduct',async (req, res) => {
    res.send(`<h1>El producto es:</h1> ${await getProductRandom(1, await contenedor.getLength()).catch("Error")}`);
})

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.error(`Error en el servidor ${error}`));