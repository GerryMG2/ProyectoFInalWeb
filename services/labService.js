const dbLabs = require('../models/laboratorio');
const dbUser = require('../models/user');

class labsService{
    constructor(){
        this.dbU=dbUser;
        this.dbL=dbLabs;
    }

    create(laboratorio){
        //TODO method to create labs

    }

    update(laboratorio){
        //TODO: method to update labs

    }

    delete(laboratorio){
        //TODO: method to delete labs

    }

}

module.exports = labsService;