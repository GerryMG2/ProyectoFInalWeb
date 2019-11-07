const dbLabs = require('../models/laboratorio');
const dbUser = require('../models/user');
const dbReserv = require('../models/reservas');

class labsReservations{
    constructor(){
        this.dbU=dbUser;
        this.dbL=dbLabs;
        this.dbR=dbReserv
    }

    create(laboratorio){
        //TODO method to create reservations

    }

    update(laboratorio){
        //TODO: method to update reservations

    }

    delete(laboratorio){
        //TODO: method to delete reservations

    }

    approve(laboratorio){
        //TODO: method to approve reservations

    }


   

}

