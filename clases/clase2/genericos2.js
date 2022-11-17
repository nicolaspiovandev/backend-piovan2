//1
let lista = [1, "Hola", 3, 5, 6, 7, 8,9, 10];
let lista2 = [];

function mostrarLista(listaDatos) {
    if(listaDatos.length === 0) {
        console.log("Lista vacía")
    } else {
        listaDatos.forEach(element => {
            console.log(element)
        })
    }
}
mostrarLista(lista2)
//Si paso "lista" me muestra todos los elementos de dicha lista

//2
function crearMultiplicador(a) {
    return function (b) {
        return a*b
    }
}

let result = crearMultiplicador(5)(8)
console.log(result)

function duplicar(a) {
    return function() {
        return a*2
    }
}

let result2 = duplicar(7)()
console.log(result2)

function triplicar(a) {
    return function() {
        return a*3
    }
}
let result3 = triplicar(6)()
console.log(result3)

class Persona {
    constructor (nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    static saludo = "Hola!"

    saludoCompleto() {
        console.log(`Hola soy ${this.nombre}`)
    }

    saludoEstatico() {
        console.log(Persona.saludo)
    }
}

const p = new Persona("Flor", 30);
console.log(p);
p.saludoCompleto()
console.log(Persona)

class Contador {
    constructor(nombre) {
        this.nombre = nombre
        this.cuenta = 0
    }

    static cuentaTotal = 0

    contar() {
        this.cuenta++
        Contador.cuentaTotal++
    }
}

const cMarcos = new Contador("Marcos")
const cAgus = new Contador("Agus")

console.log(cMarcos)
console.log(cAgus)
cMarcos.contar()
cAgus.contar()
cAgus.contar()
console.log(`El contador total es de: ${Contador.cuentaTotal}`)