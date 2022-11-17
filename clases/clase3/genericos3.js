const sumar = (a,b) => a + b

let op1 = 46, op2 = 57
let suma = sumar(op1, op2)
console.log(`La suma de ${op1} + ${op2} es igual a ${suma}`)

////////////////////////////////

const sumar2 = (a,b) => {
    let s = a + b
    return s
}
console.log(`El resultado de ${op1} + ${op2} es igual a ${sumar2(op1,op2)}`)

///////////////////////////////

const dobleDe = a => a*2
console.log(`El doble de ${op1} es ${dobleDe(op1)}`)

//////////////////////////////

const prtMensaje = () => {
    console.log("Hola")
}
prtMensaje()

///////////////////////////////

const getPersona = () => ({nombre: "juan", edad: 34})
console.log(getPersona())

/////////// CALLBACKS //////////////////////////////

const ejecutar = unaFuncion => unaFuncion()
const saludar = () => console.log("Hola buenas")
const despedir = () => console.log("Chau")
ejecutar(saludar)
ejecutar(despedir)

// Le puedo pasar contenido 

ejecutar(() => console.log("Hola hola"))

// y parametros

const start = (unaFuncion, params) => unaFuncion(params)
const sayHey = nombre => console.log(`saludos, ${nombre}`)
start(sayHey, "Terricola")

// Callback para loguear

function escribirYLoguear(texto, callbackParaLoguear) {
    console.log(texto)
    callbackParaLoguear("archivo escrito con éxito")
}

escribirYLoguear("Hola mundo de los callbacks", (mensajeParaLoguear) => {
    const fecha = new Date().toLocaleDateString()
    console.log(`${fecha}: ${mensajeParaLoguear}`)
})

/////////////////////////////////

/* Definiremos una función llamada operación que reciba como parámetro dos valores y una función con la operación que va a realizar. 
Deberá retornar el resultado.

Definiremos las siguientes funciones: suma, resta, multiplicación, división y módulo. Estas recibirán dos valores y devolverán el resultado. 
Serán pasadas como parámetro en la llamada a la función operación

Todas las funciones tendrán que ser realizadas con sintaxis flecha. */

const operacion = (c, d, oper) => oper(c, d)

const suma3 = (c, d) => c + d
const resta = (c, d) => c - d
const dividir = (c, d) => c / d
const multiplicar = (c, d) => c * d
const modulo = (c, d) => c % d

/* let resultadoSuma = operacion(8, 2, suma3)
console.log(resultadoSuma)

let resultadoResta = operacion(8, 2, resta)
console.log(resultadoResta)

let resultadoDividir = operacion(8, 2, dividir)
console.log(resultadoDividir)

let resultadoMultiplicar = operacion(8, 2, multiplicar)
console.log(resultadoMultiplicar)

let resultadoModulo = operacion(8, 2, modulo)
console.log(resultadoModulo) */

console.log(operacion(8, 2, suma3))
console.log(operacion(8, 2, resta))
console.log(operacion(8, 2, dividir))
console.log(operacion(8, 2, multiplicar))
console.log(operacion(8, 2, modulo))

/////////////////////////////////

function dividir2(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (divisor == 0) {
            reject('no se puede dividir por cero')
        } else {
            resolve(dividendo/divisor)
        }
    })
}

dividir2(10, 2)
    .then(result => {
        console.log(`resultado: ${result}`)
    })
    .catch(error => {
        console.log(`error: ${error}`)
    })


////////////////////////////////

new Promise(function (resolve, reject) {
    setTimeout(() => resolve(9), 1000) //pasar argumento "x" numero
})
    .then(result => {
        console.log(result)
        return result*2
    })
    .then(result => {
        console.log(result)
        return result*2
    })
    .then(result => {
        console.log(result)
        return result*2
    })

//////////////////////////////

const delay = ret => {for(let i=0; i<ret*3e6; i++);}

function hacerTarea(num) {
    console.log('haciendo tarea ' + num)
    delay(1000)
}

console.log('Inicio de tareas')
hacerTarea(1)
hacerTarea(2)
hacerTarea(3)
hacerTarea(4)
console.log('fin tareas')
console.log('otras tareas ...')

////////////////////////////

function aTrabajar(num, cb) {
    console.log('trabajando ' + num)
    setTimeout(cb,100)
}

console.log('inicio de jornada laboral');
aTrabajar(1, () => {
    aTrabajar(2, () => {
        aTrabajar(3, () => {
            aTrabajar(4, () => {
                console.log('fin de la jornada laboral')
            })
        })
    })
})
console.log('otras tareas ...')

//////////////

function hacerTareas(numero, time, cb) {
    setTimeout(cb, time, numero)
}

const cbEjemplo = numero => {
    console.log(`Ejecutando tarea ${numero}`)
}

hacerTareas(1, 100, cbEjemplo)
hacerTareas(2, 200, cbEjemplo)
hacerTareas(3, 300, cbEjemplo)
hacerTareas(4, 100, cbEjemplo)
