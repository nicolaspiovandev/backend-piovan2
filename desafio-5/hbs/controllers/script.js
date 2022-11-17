const fs = require('fs')

class Contenedor {
    constructor(file){
        this.file = file
    }
    async save(element){
        try {
            const  data = await fs.promises.readFile(`./${this.file}.json`, 'utf-8')
            const productsList = JSON.parse(data)
            const newProduct = {
                id: productsList[productsList.length - 1].id + 1, 
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
            }
            productsList.push(newProduct)
            try {
                await fs.promises.writeFile(`${this.file}.json`, JSON.stringify(productsList, null, 4));
                console.log(`New product saved N° ID: ${newProduct.id}`)
            } catch {
                console.log('Error')
            }
            return newProduct.id
        } catch (err) {
            const product = {
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
                id: 1, 
            }
            try {
                await fs.promises.writeFile(`${this.file}.json`, JSON.stringify([product], null, 4));
                console.log(`New product saved, N° ID: ${product.id}`)
            } catch (err) {
                console.log('Error', err)
            }
        }
    }
    
    async getAll(){
        try {
            const dataproducts = await fs.promises.readFile(`./${this.file}.json`, 'utf-8')
            const data = JSON.parse(dataproducts)
            return data
        } catch {
            console.log ('Error')
        }
    }

    async getById(id){
        try {
            const dataproducts = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const data = JSON.parse(dataproducts);
            const idproducts = data.find(product => product.id === id);
            if (!idproducts) throw new Error('That product does not exist');
            return idproducts;
        } catch (err){
            console.log (err); 
        }
    }

    async updateById(updateProduct, id){
        const products = await this.getAll();
        try {
            const productId = products.indexOf(products.find(obj => { if (obj.id === id) {return obj} }))
            if (productId >= 0) {
                products.splice(productId,1,updateProduct)
                await fs.promises.writeFile(`./${this.file}.json`, JSON.stringify(products, null, 4))
                console.log(`New item id ${id}`)
            } else if (productId < 0) {
                console.log(`Id ${id} does not exist`)
                throw new Error (`Item with ID ${id} does not exist`)
            }
        } catch (error) {
            console.log("Error => ", error)
            throw new Error (`Item with Id ${id} does not exist`)
        }
    }

    async deleteById(id){
        try {
            if(!id){
                throw new Error ('Not ID recognized');
            }
            const listProd = await fs.promises.readFile(`./${this.file}.json`, 'utf-8');
            const data = JSON.parse(listProd);
            const product = data.find(product => product.id === id);
            if(!product){
                throw new Error ('That product does not exist');
            } else {
                data.splice(data.indexOf(product),1);
                const newList = await fs.promises.writeFile(`./${this.file}.json`, JSON.stringify(data, null, 4))
                console.log(`product deleted, ID: ${product.id}`)
                return newList
            }
        } catch (err){
            console.log(err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.unlink(`${this.file}.json`)
            console.log(`Archive deleted`)
        } catch(err) {
            console.log(`Archive could not be deleted`, err)
        }
    }

    async getArrayProd(){
        try {
            const fullArray = await fs.promises.readFile(`./${this.file}.json`, 'utf-8')
            const array = await JSON.parse(fullArray) 
            return array.length
        } catch(e) {
            console.error(e)
        }
    }
}

const datoJson = new Contenedor ('products2'); 
module.exports = Contenedor;