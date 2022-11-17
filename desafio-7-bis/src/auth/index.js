const ADMINISTRADOR = true;
const USUARIO = false;

function checkRouteProducts(req, res, next) {
    if (!(ADMINISTRADOR || USUARIO)) { 
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    } else if (ADMINISTRADOR) { 
        next();
    } else if (req.method === 'GET') { 
        next();
    } else { 
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    }
};

function checkRouteCarrito(req, res, next) {
    if (!(ADMINISTRADOR || USUARIO)) {
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    } else {
        next();
    }
};

module.exports = {
    checkRouteProducts,
    checkRouteCarrito
};
