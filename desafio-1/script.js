class Usuario {
    constructor(name, surname, books, pet) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pet = pet;
    }

    getFullName() {
        console.log(`Hola ${this.name} ${this.surname}, como estás?`)
    }

    addPet(pet) {
        this.pet.push(pet);
        console.log(`Tu ${this.pet} ha sido registrada correctamente`)
    }

    countPets() {
        let quantPets = this.pet.length;
        console.log(`${this.name} ${this.surname} tiene ` + quantPets + " mascotas")
    }

    addBook(title, author) {
        return this.books.push({title, author})
    }

    getBookNames() {
        let userBooks = this.books.map(books => books.title)
        console.log(userBooks)
    }
}

let user1 = new Usuario('Pepita', 'Pistolera', [{title: 'El Duque y yo', author: 'Julia Quinn'}], ['Panqui'])

console.log('----------------')
user1.getFullName()
user1.getBookNames()
user1.countPets()
user1.addBook('El Vizconde que me amó', 'Julia Quinn')
user1.addBook('An Offer from a gentleman', 'Julia Quinn')
user1.getBookNames()