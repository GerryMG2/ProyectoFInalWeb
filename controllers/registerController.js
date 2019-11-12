const querystring = require("querystring");
const serviciousuario = require("../services/userService");
const servicioUser = new serviciousuario();
const bcrypt = require('bcrypt');

async function register(req,res){
    res.render('register_page', { title: 'Registro',msg: "" });
}


module.exports.register = register;

async function postregister (req, res) {  
  
  try {
    console.log(req.body);
    if(req.body.password == req.body.confirmPassword){
      var passHash = '';
  
      bcrypt.hash(req.body.password, 10, function(err, hash){  
        if(err){
          msg = "Ups algo paso :("
        res.render('register_page', { title: 'Registro',msg: msg });
        }else{
          console.log("hash");
          console.log(hash);
          passHash = hash;
        }
      })
  
      var msg = "";
      var usuario = {
        name: req.body.name,
        code: req.body.code,
        email: req.body.email,
        password: passHash
      };

      console.log(usuario)
  
      var validar = await servicioUser.create(usuario);
      if(validar){
        res.render('login_page', { title: 'Registro',msg: msg });
      
      }else{
        msg = "No se pudo registrar"
        res.render('register_page', { title: 'Registro',msg: msg });
      }    
    
      }else{
        msg = "Las contraseñas no son iguales!"
        res.render('register_page', { title: 'Registro',msg: msg });
      }      
  } catch (error) {
    console.log(error);
  }
}

  module.exports.registerP = postregister;
