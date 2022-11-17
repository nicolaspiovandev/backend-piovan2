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

    async updateById(updateProduct, id){
        const productos = await this.getAll();
        try {
            const productoId = productos.indexOf(productos.find(obj => { if (obj.id === id) {return obj} }))
            if (productoId >= 0) {
                productos.splice(productoId,1,updateProduct)
                await fs.promises.writeFile(`./${this.rutaTexto}.json`, JSON.stringify(productos, null, 4))
                console.log(`Se actualizó el item id ${id}`)
            } else if (productoId < 0) {
                console.log(`El id ${id} no existe`)
                throw new Error (`No existe item con Id ${id}`)
            }
        } catch (error) {
            console.log("Error => ", error)
            throw new Error (`No existe item con Id ${id}`)
        }
    }

}

const contenedor = new Contenedor("products.Ttxt")

module.exports = Contenedor

// contenedor.save({"brand": "Apple", "title": "MacBook Air", "chip": "M1", "price": 999, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mba__fchj615oz0yi_small.png"})
// contenedor.save({"brand": "Apple", "title": "MacBook Air", "chip": "M2", "price": 1199, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mbam2__bdesjk99hf4i_small.png"})
// contenedor.save({"brand": "Apple", "title": "MacBook Pro 13 pulgadas", "price": 1299, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overview/compare/compare_mbp13__euj5z15300om_small.png"})
// contenedor.save({"brand": "Apple", "title": "MacBook Pro 14 y 16 pulgadas", "price": 1999, "thumbnail": "https://www.apple.com/v/mac/home/bq/images/overvie…pare/compare_mbp14_and_16__f2dhysusb5im_small.png"})
// contenedor.save({"brand": "Apple", "title": "iMac 24 pulgadas", "price": 1299, "thumbnail": "https://store.storeimages.cdn-apple.com/4982/as-im…?wid=490&hei=500&fmt=jpeg&qlt=95&.v=1625868688000"})
// contenedor.save({"brand": "ASUS", "title": "ZenBook 14", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_732599-MLA48061930662_102021-F.webp"})
// contenedor.save({"brand": "ASUS", "title": "VivoBook 15", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_908593-MLA49420869607_032022-F.webp"})
// contenedor.save({"brand": "ASUS", "title": "TUF Dash F15", "price": 1299, "thumbnail": "https://www.asus.com/media/Odin/Websites/global/Series/33/P_setting_xxx_0_90_end_185.png?webp"})
// contenedor.save({"brand": "ASUS", "title": "ROG Zephyrus G14", "price": 1299, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_956028-MLA48157829201_112021-O.webp"})
// contenedor.save({"brand": "Lenovo", "title": "Laptop ThinkPad X1 Carbon 9na Gen", "price": 522999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkp…U2YjJjNjE3MmU2NDRmNWZlMTczMmY4Mzk5NTUwMGM1NzdjNDM"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad E14 Gen 2", "price": 286999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkp…QxMjEzZjMzMDAwNTg4Yzg5NmIwNmE3NzM4NDE3NjYzMWJkNjk"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad E15 2da Gen", "price": 261999, "thumbnail": "https://www.lenovo.com/medias/22tpe15e5n2.png?cont…UwNDljMzY5ZTMxODA2NWQzMTIwOWNlYTgxNzE3M2NkNGJlZmM"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad L14 Gen 2", "price": 251999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkp…Y5MWYwMDRlYjBjMmMwZGFlNDhhMjA1ODcwYTM0ODczODc2ZDQ"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad T14 2da Gen", "price": 351999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-think-…QyZDZhNzRhNmEzYjNhNWI5NGNiMWM1NjAwOTVjMzhmYjQzMzM"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad T14s 2da Gen", "price": 413999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-think…cyM2UwMDYwOTc4YTM2ZDc3M2FjOWRhNWQ4NzQ2MDgyNjY0Yjk"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad T15 2da Gen", "price": 383999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-think…cyM2UwMDYwOTc4YTM2ZDc3M2FjOWRhNWQ4NzQ2MDgyNjY0Yjk"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad X13 2da Gen", "price": 370999, "thumbnail": "https://www.lenovo.com/medias/22tpx13x3n2.png?cont…QzZTk3MjA1MWU0MzMwNGI0NTY1ZGQ5NGMxZTQzZGI5ZmZlMjM"})
// contenedor.save({"brand": "Lenovo", "title": "Lenovo 100e Windows 2da Gen", "price": 108000, "thumbnail": "https://www.lenovo.com/medias/lenovo-100e-windows-…jBlOGZkNjc0YzgwNmY5MjE4MmVmZGRjMmFiZDlmMWQyZWRkYg"})
// contenedor.save({"brand": "Lenovo", "title": "100e Chromebook 2da Gen", "price": 72999, "thumbnail": "https://www.lenovo.com/medias/lenovo-student-chrom…RmYzc3ZWNhNzFjYzRhMWFkMzNlY2NkNmZlYTNhZjRjZjBkMTc"})
// contenedor.save({"brand": "Lenovo", "title": "Lenovo 14e Chromebook", "price": 64999, "thumbnail": "https://www.lenovo.com/medias/lenovo-14e-chromeboo…Q4MDIzNTg3ZDlmYmI0ZjY4OGI1ODc3OTk1MDQxYTJkOGIzM2M"})
// contenedor.save({"brand": "Lenovo", "title": "Laptop gamer Legion 5 6ta Gen", "price": 313999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-legion…c0OWZmMzQ3MDhmMDkxZGJiNjc5YjNkYmUxYmExYmFhNTBkN2Y"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad Flex 5", "price": 170000, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-ideapa…0NmNkYjA4ZmY0NmY0ZTQ1YjUxYmJiZDMxZDY3ODJiMGQyN2Y5"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad 3i", "price": 114999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-ideap…kyZjRjOTI5MTNhNDNmZjA5ZWZiMzZmZGFiNjY0MDJmNzUwMzQ"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad 5i", "price": 132000, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-ideap…kODhjNWFmZmRmZTNiZWVmMGY2MTE4MDAyMGZjMTIwZjZkZGJl"})
// contenedor.save({"brand": "Lenovo", "title": "Yoga Slim 7", "price": 217999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-yoga-s…UzNDk4NWI2M2Q1M2Q0ZDVhYzBjZTI3ZjQ0OTUyMGY5MWIxZmM"})
// contenedor.save({"brand": "Lenovo", "title": "Legion 5i 7ma Gen", "price": 339999, "thumbnail": "https://www.lenovo.com/medias/lenovo-gaming-legion…kMmE1MzEyZWFkYzJmY2RmYjhhZDllZGVlNmRhMDdkYThiZDkx"})
// contenedor.save({"brand": "Lenovo", "title": "Legion Slim 7i Gen 7", "price": 463999, "thumbnail": "https://www.lenovo.com/medias/lenovo-gaming-legion…2ZmMyMGQ4YTA3YzM3MmY4OGI3NmFiMDQ1ZmRhYTliY2IzMzIz"})
// contenedor.save({"brand": "Lenovo", "title": "Legion 5 Pro 7ma Gen", "price": 432999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-legio…yNGViMmQ2YzRkMjFiODU0NjNhODFlNTRhNTQ1YjQ3MTMxZmIy"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad 3i", "price": 115000, "thumbnail": "https://www.lenovo.com/medias/88IPS301421.png?cont…A5NTRlNzY2ZGQ2YmMxZTVlNTIzYzNkYWJmMTNkZDBmMjA5MzU"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad Gaming 3i 7ma Gen", "price": 255000, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-ideap…yMzg3YzA1NzFjMGEyYjA3ZDlkZjQxYTM5YWRhYjhhNTg1YzRl"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad P15v 2da Gen", "price": 655999, "thumbnail": "https://www.lenovo.com/medias/len101t0001.png?cont…czMTkzNzI1ZTNiNWRkZGE3NDE5YTM5YWFkM2UxNTU5MDMzMjE"})
// contenedor.save({"brand": "Lenovo", "title": "IdeaPad Gaming 3 6ta Gen", "price": 242000, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-ideapa…EyYzM1M2FjMDNlMjcyMzNhYTE3YjAyMjZmMjYxZDUyMzI3YmI"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkPad P15 Gen 2", "price": 938999, "thumbnail": "https://www.lenovo.com/medias/wmd00000487.png?cont…xOWMwNTIwMzNjNTE2NzRiZGExYTQ2OWUxNmRkYjU3OTE4ZDZk"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkBook 14p 2da Gen", "price": 286999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkb…I3NGIwMTRkNmNmOWM2OWNkMTk3MjM0YWZkZTEyOTA0ODljYzc"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkBook 16p 2da Gen Mineral Grey", "price": 517999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkb…wZjY4NzI1ZmVhMTNhNjY3MGY0YzAwZTVlZTA3NzA5M2U4Njk5"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkBook 15p", "price": 385999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptop-thinkb…Q5MzdlOGNjZGRjMjgwNGVhZWU0MjhiMjRkOTI4YmFmZWQ3NTg"})
// contenedor.save({"brand": "Lenovo", "title": "ThinkBook 14s Gen 2", "price": 237999, "thumbnail": "https://www.lenovo.com/medias/lenovo-laptops-think…E4YWE4MGIxMGIyY2VlNzFhNjkzM2I3OTQ4YTM2YTg5NDdkNzM"})

//console.log(contenedor.getById(1))
//console.log(contenedor.getAll())
//contenedor.deleteAll()


