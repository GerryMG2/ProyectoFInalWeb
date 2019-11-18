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


        if (err) {
          console.log(err);
          cb(false);
        } else {

          console.log(result);
          cb(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(laboratorio, cb) {
    //TODO: method to update labs
    try {
      var query = { "code": laboratorio.code };
      this.dbL.findOneAndUpdate(query, laboratorio, { upsert: true }, function (
        err,
        doc
      ) {
        if (err) {
          console.log("Error: ", err);
          cb(false);
        } else {
          console.log("Document: ");
          console.log(doc);
          cb(true);
        }
      });
    } catch (error) {
      console.log(error);
      cb(false);
    }
  }

  delete(idLaboratorio, cb) {
    //TODO: method to delete labs
    try {
      this.dbL.remove({ _id: idLaboratorio }, function (error) {
        if (error) {
          console.log("Error ");
          console.log(error);
          cb(false);
        } else {
          cb(true);
        }
      });
    } catch (error) {
      console.log("Error en delete: ");
      console.log(error);
      cb(false);
    }
  }

  get(filtros, pags, cb) {
    try {
      let filtrosMade = {};
      if (filtros == "") {
      } else {
        filtrosMade = {
          name: /filtros/
        };
      }

      console.log(filtrosMade);

      this.dbL
        .find(filtrosMade, function (err, docs) {
          if (err) {
            console.log("Paginas: ");
            console.log("Error: ");
            console.log(err);
            cb(false, {}, 0);
          } else {

            dbLabs.find(filtrosMade, (err, docs2) => {
              if (!err) {
                var paginas = docs2.length;
                paginas = Math.ceil(paginas / 10);
                cb(true, docs, paginas);
              } else {
                cb(false, {}, 0);
              }
            });
          }
        }).skip(10 * (pags - 1)).limit(10);
    } catch (error) {
      cb(false, {}, 0);
      console.log("Error: ");
      console.log(error);
    }
  }
}

module.exports = labsService;
