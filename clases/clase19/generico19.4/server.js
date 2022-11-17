
let admin = require("firebase-admin");
const fs = require('fs')

const serviceAccount = JSON.parse(fs.readFileSync("./db/ecommerce-admin.json", "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log("Base Firebase conectada")

CRUD()

async function CRUD() {
    const db = admin.firestore()
    const query = db.collection('usuarios')

    // Create

    try {
        // const doc = query.doc() => genera id automaticamente
        let id = 1
        // Generacion manual de id
        let doc = query.doc(`${id}`)
        await doc.create({ nombre: 'Jose', dni: 1122334455 })
        id++
        doc = query.doc(`${id}`)
        await doc.create({ nombre: 'Ana', dni: 2233445566 })
        id++
        doc = query.doc(`${id}`)
        await doc.create({ nombre: 'Diego', dni: 3344556677 })

        console.log('datos insertados')
    } catch (err) { console.log(err) }

    // READ ALL 

    try {
        const querySnapshot = await query.get()
        let docs = await querySnapshot.docs

        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni,
        }))
        console.log(response)
    } catch (err) { console.log(err) }

    // READ ID

    try {
        let id = 2
        const doc = query.doc(`${id}`)
        const item = await doc.get()
        const response = item.data()
        console.log(response)
    } catch (err) { console.log(err) }

    // UPDATED 

    try {
        let id = 2
        const doc = query.doc(`${id}`)
        let item = await doc.update({ dni: 5566778899 })
        console.log("El usuario ha sido actualizado", item)
    } catch (err) { console.log(err) }

    // DELETE

    try {
        let id = 1
        const doc = query.doc(`${id}`)
        const item = await doc.delete()
        console.log("El usuario ha sido borrado exitosamente", item)
    } catch (err) { console.log(err) }

}


