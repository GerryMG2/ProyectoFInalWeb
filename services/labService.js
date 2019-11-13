const dbLabs = require("../models/laboratorio");
const dbUser = require("../models/user");

class labsService {
  constructor() {
    this.dbU = dbUser;
    this.dbL = dbLabs;
  }

  create(laboratorio, cb) {
    //TODO method to create labs
    try {
      const newLaboratorio = new this.dbL(laboratorio);
      newLaboratorio.save((err, result) => {
        console.log(err);
        console.log(result);

        if (err) {
          console.log(err);
          cb(false);
        }
        console.log(result);
        cb(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(laboratorio, cb) {
    //TODO: method to update labs
    try {
      var query = { "code ": laboratorio.code }; 
      this.dbL.findOneAndUpdate(query, laboratorio, { upsert: true }, function(err,doc) {
        if (err) cb(false);
        console.log("Document: ")
        console.log(doc);
        cb(true);

      });
    } catch (error) {
        console.log(error);
        cb(false);
    }
  }

  delete(idLaboratorio, cb) {
    //TODO: method to delete labs
    try {
        laboratorio.remove({_id: idLaboratorio}, function(error){
            if(error){
                console.log("Error ");
                console.log(error);
                cb(false);
            }else{
                cb(true);
            }
        })
    } catch (error) {
        console.log("Error en delete: ");
        console.log(error);
        cb(false);
    }
  }

  get(filtros,pags,cb) {
      try {
          this.dbL.find(filtros, function(err,docs){
            if(err){
                console.log("Error: ");
                console.log(err);
                cb(false,{});
            }else{
                cb(true,docs);
            }
          }).skip(10 * (pags - 1)).limit(10);
          
      } catch (error) {
          cb(false,{});
          console.log("Error: ");
          console.log(error);
      }
  }
}

module.exports = labsService;
