const fs = require('fs')

class Contenedor{
    constructor(archive){
        this.archive= archive;
        this.products = [];
    }

    async read(){
        try{
            let dB = await fs.promises.readFile(this.archive, 'utf-8')
            return dB
        }catch(e){
            console.log("error")
        }
    }

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    } 

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
            await  fs.promises.writeFile(this.archive, JSON.stringify(this.products, null, 2))
        }catch(e){
            console.error("No se pudo guardar" + e)
        }
    }

    getById(id){
        let resultId = this.products.find(prod => prod.id == id)
        return resultId
    }

    async getAll(){
        return this.products
    }

    deleteById(id){
        const index = this.products.findIndex(prod => prod.id == id)
        this.products.splice(index, 1)
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, "[]")
    }

}

const contenedor = new Contenedor("products.txt")

contenedor.save({"brand": "Apple", "title": "MacBook Air", "chip": "M1", "price": 999, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mba__fchj615oz0yi_small.png"})
contenedor.save({"brand": "Apple", "title": "MacBook Air", "chip": "M2", "price": 1199, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mbam2__bdesjk99hf4i_small.png"})
contenedor.save({"brand": "Apple", "title": "MacBook Pro 13 pulgadas", "price": 1299, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mbp13__euj5z15300om_small.png"})
contenedor.save({"brand": "Apple", "title": "MacBook Pro 14 y 16 pulgadas", "price": 1999, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overvie…pare/compare_mbp14_and_16__f2dhysusb5im_small.png"})
contenedor.save({"brand": "Apple", "title": "iMac 24 pulgadas", "price": 1299, "thumbnail": "https://store.storeimages.cdn-apple.com/4982/as-im…?wid=490&hei=500&fmt=jpeg&qlt=95&.v=1625868688000"})
contenedor.save({"brand": "ASUS", "title": "ZenBook 14", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_732599-MLA48061930662_102021-F.webp"})
contenedor.save({"brand": "ASUS", "title": "VivoBook 15", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_908593-MLA49420869607_032022-F.webp"})
contenedor.save({"brand": "ASUS", "title": "TUF Dash F15", "price": 1299, "thumbnail": "https://www.asus.com/media/Odin/Websites/global/Series/33/P_setting_xxx_0_90_end_185.png?webp"})
contenedor.save({"brand": "ASUS", "title": "ROG Zephyrus G14", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_956028-MLA48157829201_112021-O.webp"})

//console.log(contenedor.getById(1))
//console.log(contenedor.getAll())
//contenedor.deleteAll()


