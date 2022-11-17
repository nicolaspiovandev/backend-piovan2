const middleware1 = (req, res, next) => {
    console.log('middleware1 ok')
    console.log(req.headers)
    let { authorization } = req.headers;
    if(authorization == "admin"){
        console.log('Permissions ok ')
        next()
    }else{
        res.send("You don't have permissions")
    }

}

const middleware2 = (req, res, next) => {
    console.log('middleware2 ok')
    if(req.body.direccion){
        console.log('Tiene direccion')
    }else{
        res.status(400).send({ error: "No tiene direccion"})
    }

    next()
}

module.exports = { middleware1, middleware2 }