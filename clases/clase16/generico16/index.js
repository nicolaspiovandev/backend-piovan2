import ClienteSql from './sql'
import { options } from './options/SQLite3.js'

// Utilizando MySQL Workbench crear base de datos 'ecommerce' en MariaDB
// Comando SQL -> create database ecommerce;

const sql = new ClienteSql(options)

try {
    // Punto 1
    await sql.crearTabla()
    console.log("1) tabla creada")

    // Punto 2
    const articulosParaInsertar = [
        { nombre: 'SQLite', codigo: 'AB-12', precio: 23.60, stock: 24 },
        { nombre: 'SQLite', codigo: 'CD-34', precio: 12.80, stock: 45 },
        { nombre: 'SQLite', codigo: 'EF-56', precio: 32.30, stock: 16 },
        { nombre: 'SQLite', codigo: 'FG-44', precio: 42.70, stock: 34 },
        { nombre: 'SQLite', codigo: 'CR-77', precio: 67.90, stock: 24 }
    ]
    await sql.insertarArticulos(articulosParaInsertar)
    console.log("2) articulos insertados")

    // Punto 3
    const articulosLeidos = await sql.listarArticulos()
    console.log("3) articulos listado")
    console.table(articulosLeidos)

    // Punto 4
    await sql.borrarArticuloPorId(3)
    console.log("4) articulo borrado")

    // Punto 5
    await sql.actualizarStockPorId(0, 2)
    console.log("5) stock actualizado")

    // Resultado Final
    const articulosFinal = await sql.listarArticulos()
    console.log("resultado total")
    console.table(articulosFinal)
} catch (error) {
    console.log(error)
} finally {
    sql.close()
}