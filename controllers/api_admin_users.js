const userServices = require("../services/userService");
const userService = new userServices();


async function update(req,res){
    try {
        console.log("Req.body: ");
        console.log(req.body);
        var users = {
            name: req.body.name,
            code: req.body.code, 
            email: req.body.email,
            superUser: req.body.superUser
        };

        userService.update(users, validar =>{
            if(validar){
                res.status(201).json({result: "success", msg: "Usuario actualizado!"});
            } else {
                res.status(500).json({result: "error", msg: "No se pudo crear"});
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({result: "error", msg: "No se pudo crear"});
    }
}

module.exports.updateUser = update;

async function deleteUser(req,res){
    try {
        userService.delete(req.body.code, validar => {
            if(validar){
                res.status(201).json({ result: "success", msg: "Usuario eliminado"});
            } else {
                res.status(500).json({ result: "error", msg: "No se pudo eliminar"});
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo eliminar"})
    }
}

module.exports.deleteUser = deleteUser;

async function getUsers(req,res){
    try {
        console.log("params", req.query.filtros);
        userService.get(
            req.query.filtros,
            parseInt(req.query.page),
            (validar, docs, pags) => {
                if(validar){
                    var respuesta = {
                        docs: docs,
                        paginas: parseInt(pags)
                    };
                    res.status(200).json(respuesta);
                }else{
                    res.status(500).json({docs: {}, paginas: 0});
                }
            }
        );
    } catch (error) {
        res.status(500).json({ docs: {}, paginas: 0});
    }
}

module.exports.getUsers = getUsers;

async function getSuperUserCode(req,res){
    try {
        userService.getEncargados((validar, users)=>{
            if(validar){
                keys = users.map((u)=>{
                    return u.code;
                })
                res.status(200).json(keys);
            }else{
                res.status(500).json({})
            }
        })
    } catch (error) {
        console.log("Error: ");
        console.log(error)        
        res.status(500).json({})

    }
}

module.exports.getSuperUsers = getSuperUserCode;

