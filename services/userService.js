const dbUser = require("../models/user");
const bycrypt = require("bcrypt");
class userService {
  constructor() {
    this.db = dbUser;
  }

  getByCode(code,cb){
    try {
      console.log(code);
      this.db.find({code: code}, function (err, docs) {
        if (err) {
          console.log("Error: ");
          console.log(err);
          cb(false, {});
        } else {
          console.log(docs);
          cb(true, docs);
        }
      });

    } catch (error) {
      cb(false, {});
      console.log("Error: ");
      console.log(error);
    }
  }


  getEncargados(cb) {
    try {
      this.db.find({ superUser: true }, function (err, docs) {
        if (err) {
          console.log("Error: ");
          console.log(err);
          cb(false, {});
        } else {
          cb(true, docs);
        }
      });

    } catch (error) {
      cb(false, {});
      console.log("Error: ");
      console.log(error);
    }
  }

  get(filtros, pags,cb) {
    try {
      let filtrosMade = {};
      if(filtros == ""){
      }else{
        filtrosMade = {
          name: /filtros/
        };
      }
      console.log(filtrosMade);

      this.db.find(filtrosMade, function (err, docs) {
        if (err) {
          console.log("Error: ");
          console.log(err);
          cb(false, {}, 0);
        }else {
          dbUser.find(filtrosMade, (err, docs2) =>{
            if(!err){
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


  create(usuario, cb) {
    try {
      const newUsuario = new this.db(usuario);
      newUsuario.save((err, result) => {

        if (err) {
          console.log("Error: ");
          console.log(err);
          console.log("*****");
          cb(false);
        } else {

          console.log("Resultado: ");
          console.log(result);
          console.log("*******");
          cb(true);
        }
      });
    } catch (error) {
      console.log("Error Try Catch Service: ");
      console.log(error);
    }
  }

  update(usuario, cb) {
    //TODO: method to update users
    try {
      var query = {"code": usuario.code};
      this.db.findOneAndUpdate(query, usuario, {upsert: true}, function(
        err, doc
      ){
        if(err){
          console.log("Error: ", err);
          cb(false);
        }else{
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

  delete(id, cb) {
    try {
      this.db.remove({code: id}, function (error){
        if(error){
          console.log("Error users: ");
          console.log(error);
          cb(false);
        } else {
          cb(true);
        }
      });
    } catch (error) {
      console.log("Error en delete users: ")
      console.log(error);
      cb(false);
    }
  }

  validate(code, password, cb) {
    try {
      this.db.findOne({ code: code }, "password superUser", (err, user) => {
        if (err) {
          
          console.log(err);
          cb(false,false);
        } else {
          try {
            console.log("user: ",user)
            if (bycrypt.compareSync(password, user.password)) {
              if (user.superUser) {
                console.log("es super user");
                cb(true, true);
              } else {
  
                console.log("no super user");
                cb(true, false);
              }
            } else {
              cb(false, false);
            }
          } catch (error) {
            console.log(error);
            cb(false, false);
          }
         
          
        }
      });
    } catch (error) {
      
      console.log(error);
      cb(false,false);
    }

    //TODO: validaion credentials
  }
}

module.exports = userService;
