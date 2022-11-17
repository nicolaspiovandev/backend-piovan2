const express = require('express')
const app = express();
const routerProduct = require('./components/products/routes')
const routerCart = require('./components/carrito/routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../../public'));
app.use('/api/productos', routerProduct);
app.use('/api/carrito', routerCart);

app.get('*', (req, res) => {
    res.json("Error: Route or method not implemented");
}
);

app.post('*', (req, res) => {
    res.json("Error: Route or method not implemented");
}
);

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
server.on('error', err => console.log( 'Error at server: ' + err ));
