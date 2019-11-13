const querystring = require("querystring");
const serviceUsers = require("../services/userService");
const serviceUser = new serviceUsers();

function loginGet(req, res) {
  res.render("login_page", { title: "login", msg: "" });
}

module.exports.loginGet = loginGet;

async function loginPost(req, res) {
  if (!req.body.code || !req.body.password) {
    res.render("login_page", {
      title: "login",
      msg: "Ingrese los campos",
      error: true
    });
  } else {
    serviceUser.validate(
      req.body.code,
      req.body.password,
      (validate, superUser) => {
        if (validate) {
          req.session.user = req.body.code;
          req.session.admin = superUser;
          if (req.session.returnto) {
            var redirect = req.session.returnto;
            delete req.session.returnto;
            res.render(redirect);
          } else {
            res.render("index",{title: "Main Page", nombre: req.session.user, admin: req.session.superUser});
          }
        }else{
          res.render("login_page",{title: "login", msg: "El usuario o la contraseña es incorrecta"})
        }
      }
    );
  }
}

// servicioUsuarios.validate(req.body.username, req.body.password);
module.exports.loginPost = loginPost;
