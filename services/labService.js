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
      newLaboratorio.save()
        .then(result => {
          console.log(result);
          cb(true);  // Llamada al callback con true si todo salió bien
        })
        .catch(err => {
          console.log(err);
          cb(false);  // Llamada al callback con false si ocurrió un error
        });
    } catch (error) {
      console.log(error);
    }
  }

  update(laboratorio, cb) {
    //TODO: method to update labs
    try {
      var query = { "code": laboratorio.code };
      this.dbL.findOneAndUpdate(query, laboratorio, { upsert: true }).then(doc =>{
        console.log("Document: ");
        console.log(doc);
        cb(true);
      }).catch(err => {
        console.log("Error: ", err);
        cb(false);
      });
      
     
    } catch (error) {
      console.log(error);
      cb(false);
    }
  }

  delete(idLaboratorio, cb) {
    //TODO: method to delete labs
    try {
      this.dbL.remove({ _id: idLaboratorio }).then(res => {
        cb(true);
      }).catch(error => {
        console.log("Error ");
        console.log(error);
        cb(false);
      });
    } catch (error) {
      console.log("Error en delete: ");
      console.log(error);
      cb(false);
    }
  }

  get(filtros, pags, size, orden, cb) {
    try {
      let filtrosMade = {};
      if (filtros == "") {
      } else {
        filtrosMade = {
          $or: [
            { building: { $regex: '.*' + filtros + '.*' } },
            { code: { $regex: '.*' + filtros + '.*' } },
            { name: { $regex: '.*' + filtros + '.*' } },
            { inCharge: { $regex: '.*' + filtros + '.*' } }
          ],
        };
      }

      console.log(filtrosMade);

      this.dbL
        .find(filtrosMade).skip(10 * (pags - 1)).limit(size).sort(orden).then(docs =>{
          dbLabs.find(filtrosMade).then(docs2 =>{
            var paginas = docs2.length;
            paginas = Math.ceil(paginas / 10);
            cb(true, docs, paginas);
          }).catch(err =>{
            cb(false, {}, 0);
          });
          
        }).catch(docs =>{
          console.log("Paginas: ");
          console.log("Error: ");
          console.log(err);
          cb(false, {}, 0);
        });
        
    } catch (error) {
      cb(false, {}, 0);
      console.log("Error: ");
      console.log(error);
    }
  }

  getLab(cb) {
    try {
      this.dbL.find({}).then(docs => {
        console.log(docs);
        let lista = docs.map(function (e) {
          return { name: e.name, code: e.code, _id: e._id }
        });
        cb(true, lista);
      }).catch(err => {
        console.log("Paginas: ");
        console.log("Error: ");
        console.log(err);
        console.log(docs);
        cb(false, {});
      });
    } catch (error) {
      cb(false, {}, 0);
      console.log("Error: ");
      console.log(error);
    }
  }
}
module.exports = labsService;
