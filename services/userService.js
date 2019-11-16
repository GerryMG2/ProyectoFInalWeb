const dbUser = require("../models/user");
const bycrypt = require("bcrypt");
class userService {
  constructor() {
    this.db = dbUser;
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

  get(filtros, cb) {
    try {
      this.db.find(filtros, function (err, docs) {
        if (err) {
          console.log("Error: ");
          console.log(err);
          cb(false, {});
        } else {
          cb(true, docs);
        }
      }).skip(10 * (pags - 1)).limit(10);

    } catch (error) {
      cb(false, {});
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
  }

  delete(id, cb) {
    // TODO: Method to delete users
  }

  validate(code, password, cb) {
    try {
      this.db.findOne({ code: code }, "password superUser", (err, user) => {
        if (err) {
          
          console.log(err);
          cb(false,false);
        } else {
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
