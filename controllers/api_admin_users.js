const userServices = require("../services/userService");
const userService = new userServices();


async function create(req,res){

}

module.exports.createUser = create;

async function update(req,res){

}

module.exports.updateUser = update;

async function deleteUser(req,res){

}

module.exports.deleteUser = deleteUser;

async function getUsers(req,res){

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

