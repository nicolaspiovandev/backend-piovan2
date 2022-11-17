function mostrarLetras(palabra, termine ){
    let i=0
    const timer = setInterval(()=> {
        if(i<palabra.length){
            console.log(palabra[i])
            i++
        } else {
            clearInterval(timer)
            termine()
        }
    }, 1000)
}

const fin = () => console.log("termine")

setTimeout(()=> {mostrarLetras('hola', fin); }, 0)
setTimeout(()=> {mostrarLetras('hola', fin); }, 250)
setTimeout(()=> {mostrarLetras('hola', fin); }, 500) 

//mostrarLetras('ejemplo', () => console.log('termino el ejemplo'))
///////////////////////////////

const fs = require('fs')

try {
    let fechaYHora = new Date().toLocaleString();
    fs.writeFileSync('fyh.txt', fechaYHora)
} catch (error) {
    throw new Error (`Error en escritura: ${error.message}`)
}

try {
    const contenido = fs.readFileSync('genericos4.js', 'utf-8')
    console.log(contenido)
} catch (error) {
    throw new Error(`Error en lectura: ${error.message}`)
}


//////////////////////////////////

fs.readFile('./package.json', 'utf-8', (error, contenido) => {
    if (error) {
        throw new Error(`Error en lectura: ${error}`)
    }

    console.log('package.json: lectura exitosa')

    const info = {
        contenidoStr: contenido,
        contenidoObj: JSON.parse(contenido),
        size: contenido.length
    }

    console.log(info)

    fs.writeFile('info.txt', JSON.stringify(info, null, 2), error => {
        if (error) {
            throw new Error(`Error en escritura: ${error}`)
        }
        console.log('info.txt: escritura exitosa')
    })
})