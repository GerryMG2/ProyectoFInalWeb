const querystring = require("querystring");
const serviciousuario = require("../services/userService");
const servicioUser = new serviciousuario();
const bcrypt = require("bcrypt");

async function register(req, res) {
  res.render("register_page", { title: "Registro", msg: "" });
}

module.exports.register = register;

async function postregister(req, res) {
  try {
    console.log(req.body);
    if (req.body.password == req.body.confirmPassword) {
      var passHash = bcrypt.hashSync(req.body.password, 10);
      var msg = "";
      var usuario = {
        name: req.body.name,
        code: req.body.code,
        email: req.body.email,
        password: passHash
      };

      console.log(usuario);

       servicioUser.create(usuario, (validar)=> {
        console.log("validar: ");
        console.log(validar);
        if (validar) {
          res.render("login_page", { title: "Registro", msg: msg });
        } else {
          msg = "No se pudo registrar";
          res.render("register_page", { title: "Registro", msg: msg });
        }
       });
     
    } else {
      msg = "Las contraseñas no son iguales!";
      res.render("register_page", { title: "Registro", msg: msg });
    }
  } catch (error) {
    console.log("Error controller: ");
    console.log(error);
    console.log("*******");
  }
}

module.exports.registerP = postregister;
