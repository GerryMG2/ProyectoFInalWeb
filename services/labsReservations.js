const dbLabs = require('../models/laboratorio');
const dbUser = require('../models/user');
const dbReserv = require('../models/reservas');

class labsReservations{
    constructor(){
        this.dbU=dbUser;
        this.dbL=dbLabs;
        this.dbR=dbReserv
    }

    async create(laboratorio){
        //TODO method to create reservations

    }

    async update(laboratorio){
        //TODO: method to update reservations

    }

    async delete(laboratorio){
        //TODO: method to delete reservations

    }

    async approve(laboratorio){
        //TODO: method to approve reservations

    }


   

}

