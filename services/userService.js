

const dbUser = require('../models/user');


class userService{
    
    constructor(){
        this.db = dbUser;
    }


    async create(usuario){
        const newUsuario = new this.db(usuario);
        await newUsuario.save().then((err,result) => {
            if(err){
                return false;
            }
            console.log(result);
            return true;
            
        });
        
    }

    async update(usuario){
        //TODO: method to update users
    }


    async delete(id){
        // TODO: Method to delete users
    }

    async validate(username,password){
        

        //TODO: validaion credentials
    }









}

module.exports = userService;