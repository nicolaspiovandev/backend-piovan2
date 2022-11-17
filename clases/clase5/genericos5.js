//EJERCICIO 1
//A- Crear un proyecto en node.js que genere 10000 números aleatorios en el rango  de 1 a 20.
//B- Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.
/* for (let i = 0; i < 9999; i++) {
    let numeros = new Map();
    let numRandom = Math.floor(Math.random()*20);
    console.log(numRandom)
    return numeros;
} */

const random = require('random');
let numbers = new Map();
for (let i = 0; i < 10000; i++) {
    let randomNum = random.int(1, 20);
    if(numbers.has(randomNum)) {
        numbers.set(randomNum, numbers.get(randomNum)+1);    
    } else {
        numbers.set(randomNum, 1);
    }
}

console.log(numbers);

//EJERCICIO 2
//Desarrollar un proyecto en node.js que declare un array de objetos de este tipo:

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

// Y obtenga la siguiente información de dicho array
// A) Los nombres de los productos en un string separados por comas.
let nombreProductos = '';
let arrayNombres = [];
productos.forEach(producto => {
    arrayNombres.push(producto.nombre)
})
nombreProductos = arrayNombres.join(',')
// B) El precio total
let precioTotal = 0;
// C) El precio promedio
let precioPromedio = precioTotal / productos.length;
// D) El producto con menor precio
const minimo = Math.min(...productos.map(producto => producto.precio))
let menorPrecio = productos.filter(producto => producto.precio === minimo)
// E) El producto con mayor precio
const maximo = Math.max(...productos.map(producto => producto.precio), 0)
let mayorPrecio = productos.filter(producto => producto.precio === maximo)
// F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola
let valores = {
    nombres: nombreProductos,
    total: precioTotal,
    promedio: precioPromedio,
    menorPrecio: menorPrecio,
    mayorPrecio: mayorPrecio
}

console.log(valores)


//EJERCICIO 3, CALCULADORA DE EDAD
// Realizar un proyecto en node.js que permita calcular cuántos años y días totales transcurrieron desde la fecha de tu nacimiento. Para ello utilizar la dependencia moment instalándola en forma local desde npm. Imprimir los resultados por consola. Hacer las modificaciones necesarias para que sólo se actualicen los patches para la librería recién instalada.
const moment = require('moment');
moment.locale('es')
let fechaNacimiento = '1992-08-24';
let fechaHoy = '2022-09-13'

let fecha1 = moment(fechaHoy);
let fecha2 = moment(fechaNacimiento)

console.log(`Hoy es ${fecha1.format('LL')}`)
console.log(`Naci el ${fecha2.format('LL')}`)
console.log(`Desde mi nacimiento pasaron ${fecha1.diff(fecha2, 'days')} dias`)
console.log(`Desde mi nacimiento pasaron ${fecha1.diff(fecha2, 'years')} años`)
// Un ejemplo de salida:
// Hoy es 11/01/2021
// Nací el 29/11/1968
// Desde mi nacimiento han pasado 52 años.
// Desde mi nacimiento han pasado 19036 días.

// Ayuda:
// Utilizar los métodos diff y format de la librería moment.
