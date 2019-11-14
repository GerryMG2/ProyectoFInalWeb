const dbUser = require("../models/user");
const bycrypt = require("bcrypt");
class userService {
  constructor() {
    this.db = dbUser;
  }


  getEncargados(cb) {
    try {
      this.db.find({superUser: true}, function (err, docs) {
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
        console.log("Err: ");
        console.log(err);
        console.log("result: ");
        console.log(result);

        if (err) {
          console.log("Error: ");
          console.log(err);
          console.log("*****");
          cb(false);
        }
        console.log("Resultado: ");
        console.log(result);
        console.log("*******");
        cb(true);
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
      this.db.findOne({ code: code }, "password superuser", (err, user) => {
        if (err) {
          console.log(err);
        } else {
          if (bycrypt.compareSync(password, user.password)) {
            if (user.superUser) {
              cb(true, true);
            }
            cb(true, false);
          } else {
            cb(false, false);
          }
        }
      });
    } catch (error) {
      cb(false);
      console.log(error);
    }

    //TODO: validaion credentials
  }
}

module.exports = userService;
