const express = require('express')
const exphbs = require('express-handlebars');
const axios = require("axios").default;
const fs = require('fs')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.set('views', './views')

app.get('/', (req, res) => {
    res.render('datos', {
        nombre: 'coder',
        apellido: 'house',
        edad: 25,
        email: 'coder@house',
        telefono: '12345678'
    })
})

app.get('/curso', (req, res) => {
    const colegio = {
        nombre: 'Colegio de Coder House',
        alumnos: [
            { nombre: 'coder', apellido: 'house', dni: 402322332 },
            { nombre: 'coder2', apellido: 'house', dni: 23232233 },
            { nombre: 'coder3', apellido: 'house', dni: 343435335 },
            { nombre: 'coder4', apellido: 'house', dni: 56556565 },
            { nombre: 'coder5', apellido: 'house', dni: 5656565 },
        ],
        contacto: '+545456456456',
        ubicacion: 'Remoto'
    }

    res.render('curso', { colegio })
})

app.get('/champion', (req, res) => {
    let result = getChampions();
    let champions = JSON.parse(result)
    res.render('champion', { champions })
})

app.get('/pokemon', async (req, res) => {
    let result = await getPokemon();
    let pokemon = result.results;
    res.render('pokemon', { pokemon })
})

app.get('/nuevaRuta', (req, res) => {
    let datos = getDatosEjemplo();
    res.render('datos2', { datos })
})


const getChampions = () => {
    let champs = fs.readFileSync('./champions.txt', 'utf8')
    return champs;
}

const getPokemon = async () => {
    let options = { method: 'GET', url: 'https://pokeapi.co/api/v2/pokemon' };

    const pokemon = await axios.request(options);
    return pokemon.data;
}

const getDatosEjemplo = () => {
    let datos = {
        usuarios: [
            { name: 'Jorge', user: 'pepito', champion: 'x' },
            { name: 'Marcos', user: 'marquitos', champion: 'y' },
            { name: 'Lucas', user: 'luquitas96', champion: 'c' },
            { name: 'Marta', user: 'martita89', champion: 'p' },
            { name: 'Lucia', user: 'luli23', champion: 'u' },
        ],
        partidas: [
            { id: 4, duracion: 5, type: 'clase de bootstrap' },
            { id: 3, duracion: 6 },
            { id: 2, duracion: 7 },
            { id: 1, duracion: 8 }
        ]
    }

    return datos;
}

app.listen(8080, () => {
    console.log(`Server running on port: 8080`)
})