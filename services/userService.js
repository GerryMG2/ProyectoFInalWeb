

const dbUser = require('../models/user');


class userService{
    
    constructor(){
        this.db = dbUser;
    }


    create(usuario){
        
        //TODO: method to create users
    }

    update(usuario){
        //TODO: method to update users
    }


    delete(id){
        // TODO: Method to delete users
    }

    validate(username,password){
        //TODO: validaion credentials
    }







}

module.exports = userService;