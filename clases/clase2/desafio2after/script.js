const fs = require('fs');

class Contenedor{
    constructor(file) {
        this.file = file
    }

    async save(producto) {
        let contenido = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(contenido)
        let newId;
        newId = contObj.length > 0 ? contObj.length  + 1 : 1;
        producto.id = newId;
        contObj.push(producto)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    async getAll() {
        let contenido = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(contenido)
        return contObj;
    }

    async getById(id) {
        let contObj = await this.getAll()
        let resultado = contObj.find(obj => obj.id == id)
        return resultado;
    }

    async deleteById(id) {
        let contObj = await this.getAll()
        let nuevoObj = contObj.filter(obj => obj.id !== id)
        await fs.promises.writeFile(this.file, JSON.stringify(nuevoObj))
    }

    async deleteAll() {
        await fs.promises.writeFile(this.file, "[]")
    }
}



product1 = {"title": "Star Wars, La guerra de las Galaxias", "price": 5500, "thumbnail": "https://covers.alibrate.com/b/5e5aac4db9635a5c549dae66/49e0edbd-187f-41d0-8a31-173507558b1a/share"}
product2 = {"title": "Star Wars, El Imperio Contraataca", "price": 3450.50, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_781690-MLA42412141615_062020-F.webp"}
product3 = {"title": "Star Wars, El Regreso del Jedi", "price": 4252, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_646558-MLA30866073031_052019-O.webp"}
let productos = new Contenedor('products.txt')
let carrito = new Contenedor('carrito.txt')

const usarContenedor = async () => {
    await productos.save(product1)
    await productos.save(product2)
    await productos.save(product3)

    await carrito.save(product1)
    await carrito.save(product2)
    await carrito.save(product3)
}

usarContenedor()