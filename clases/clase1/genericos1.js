let myName = "Flor"
let age = 30
let price = parseInt("99,90")
let series = ["Peaky Blinders", "Game Of Thrones", "Big bang theory"]
let movies = [
    {
        "id":1,
        "nombre":"Star Wars, La Guerra de las Galaxias",
        "año":1977,
    },
    {
        "id":2,
        "nombre":"Star Wars, El Imperio Contraataca",
        "año":1980,
    },
    {
        "id":3,
        "nombre":"Star Wars, El Regreso del Jedi",
        "año":1983,
    },
    {
        "id":4,
        "nombre":"Star Wars, La Amenaza Fantasma",
        "año":1999,
    },
    {
        "id":5,
        "nombre":"Star Wars, El Ataque de los Clones",
        "año":2002,
    },
    {
        "id":6,
        "nombre":"Star Wars, La Venganza de los Sith",
        "año":2005,
    },
    {
        "id":7,
        "nombre":"Star Wars, El Despertar de la Fuerza",
        "año":2015,
    },
]

console.log(myName)
console.log(age)
console.log(price)
console.log(series)
console.log(movies)
console.log(age + 1)
console.log(movies[2])

let añoPelis = movies.map(años => años.año)
console.log(añoPelis)

series.push("The nanny")
console.log(series)