

const serviciousuario = require("../services/userService")();


function register(req,res){
    res.render('register_page', { title: 'Registro' });
}

const querystring = require("querystring");

module.exports.register = register;

function postregister (req, res) {

    usuario = {
      username: req.body.username,
    }
    serviciousuario.create(usuario);


    const query = querystring.stringify({
      "nombre": req.body.name,
    });
    res.redirect('/main?' + query);
  
  }

  module.exports.registerP = postregister;
