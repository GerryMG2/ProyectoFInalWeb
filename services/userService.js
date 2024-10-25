const dbUser = require("../models/user");
const bycrypt = require("bcrypt");


class userService {
  constructor() {
    this.db = dbUser;
  }
  updatePass(code, oldPass, newPass, confPass, cb) {
    try {
      this.validate(code, oldPass, (validar, superUser) => {
        if (validar && newPass != "" && newPass == confPass) {
          var passHash = bycrypt.hashSync(newPass, 10);

          var query = { "code": code };


          this.db.findOneAndUpdate(query, { password: passHash }, { upsert: true })
            .then(doc => {
              console.log("Document: ", doc);
              cb(true); // Call the callback with true if successful
            })
            .catch(err => {
              console.log("Error: ", err);
              cb(false); // Call the callback with false if there's an error
            });

        } else {
          cb(false);
        }

      });

    } catch (error) {
      console.log(error);
      cb(false);
    }
  }

  updateEmail(newMail, code, cb) {
    try {
      if (newMail != "") {
        var query = { "code": code };

        this.db.findOneAndUpdate(query, { email: newMail })
          .then(doc => {
            console.log("Document: ", doc);
            cb(true); // Llama al callback con true si tiene éxito
          })
          .catch(err => {
            console.log("Error: ", err);
            cb(false); // Llama al callback con false si hay un error
          });

      } else {
        cb(false);
      }

    } catch (error) {
      console.log(error);
      cb(false);
    }

  }


  getByCode(code, cb) {
    try {
      console.log(code);
      this.db.find({ code: code })
        .then(docs => {
          console.log(docs);
          cb(true, docs); // Llama al callback con true y los documentos si tiene éxito
        })
        .catch(err => {
          console.log("Error: ", err);
          cb(false, {}); // Llama al callback con false y un objeto vacío si hay un error
        });

    } catch (error) {
      cb(false, {});
      console.log("Error: ");
      console.log(error);
    }
  }


  getEncargados(cb) {
    try {
      this.db.find({ superUser: true })
        .then(docs => {
          cb(true, docs); // Llama al callback con true y los documentos si tiene éxito
        })
        .catch(err => {
          console.log("Error: ", err);
          cb(false, {}); // Llama al callback con false y un objeto vacío si hay un error
        });

    } catch (error) {
      cb(false, {});
      console.log("Error: ");
      console.log(error);
    }
  }

  get(filtros, pags, size, orden, cb) {
    try {
      let filtrosMade = {};
      if (filtros == "") {
      } else {
        filtrosMade = {
          $or: [
            { name: { $regex: '.*' + filtros + '.*' } },
            { code: { $regex: '.*' + filtros + '.*' } },
            { email: { $regex: '.*' + filtros + '.*' } }
          ],
        };
      }
      console.log(filtrosMade);

      this.db.find(filtrosMade)
        .skip(size * (pags - 1))
        .limit(size)
        .sort(orden)
        .then(docs => {
          dbUser.find(filtrosMade)
            .then(docs2 => {
              var paginas = Math.ceil(docs2.length / 10); // Calcular el número de páginas
              cb(true, docs, paginas); // Llama al callback con los resultados
            })
            .catch(err => {
              console.log("Error: ", err);
              cb(false, {}, 0); // Llama al callback con error
            });
        }).catch(err => {
          console.log("Error: ", err);
          cb(false, {}, 0); // Llama al callback con error
        });


    } catch (error) {
      cb(false, {}, 0);
      console.log("Error: ");
      console.log(error);
    }
  }


  create(usuario, cb) {
    try {
      const newUsuario = new this.db(usuario);
      newUsuario.save().then(savedUser => {
        console.log(savedUser);
        cb(true);
      })
        .catch(err => {
          console.log(err);
          cb(false)
        });

    } catch (error) {
      cb(false)
      console.log("Error Try Catch Service: ");
      console.log(error);
    }
  }

  update(usuario, cb) {
    //TODO: method to update users
    try {
      var query = { "code": usuario.code };
      this.db.findOneAndUpdate(query, usuario, { upsert: true })
        .then(doc => {
          console.log("Document: ", doc);
          cb(true); // Llama al callback con true si tiene éxito
        })
        .catch(err => {
          console.log("Error: ", err);
          cb(false); // Llama al callback con false si hay un error
        });
    } catch (error) {
      console.log(error);
      cb(false);
    }
  }

  delete(id, cb) {
    try {
      this.db.remove({ code: id })
        .then(() => {
          cb(true); // Llama al callback con true si la eliminación tiene éxito
        })
        .catch(error => {
          console.log("Error users: ", error);
          cb(false); // Llama al callback con false si hay un error
        });
    } catch (error) {
      console.log("Error en delete users: ")
      console.log(error);
      cb(false);
    }
  }

  validate(code, password, cb) {
    try {
      this.db.findOne({ code: code }, "password superUser").exec()
        .then(user => {
          if (!user) {
            console.log("Usuario no encontrado");
            return cb(false, false); // Usuario no encontrado
          }

          console.log("user: ", user);

          // Comparar la contraseña usando bcrypt
          if (bycrypt.compareSync(password, user.password)) {
            if (user.superUser) {
              console.log("es super user");
              cb(true, true); // Es un super usuario
            } else {
              console.log("no super user");
              cb(true, false); // No es un super usuario
            }
          } else {
            console.log("Contraseña incorrecta");
            cb(false, false); // Contraseña incorrecta
          }
        })
        .catch(err => {
          console.log(err);
          cb(false, false); // Manejo de errores en la búsqueda
        });
    } catch (error) {

      console.log(error);
      cb(false, false);
    }

    //TODO: validaion credentials
  }
}

module.exports = userService;
