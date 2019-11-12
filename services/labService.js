const dbLabs = require('../models/laboratorio');
const dbUser = require('../models/user');

class labsService{
    constructor(){
        this.dbU=dbUser;
        this.dbL=dbLabs;
    }

    async create(laboratorio){
        //TODO method to create labs

    }

    async update(laboratorio){
        //TODO: method to update labs

    }

    async delete(laboratorio){
        //TODO: method to delete labs

    }

}

module.exports = labsService;