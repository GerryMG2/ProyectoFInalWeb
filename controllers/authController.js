const querystring = require('querystring');
const serviceUsers = require("../services/userService");
const servicioUsuarios = serviceUsers();


function loginGet(req,res){
    res.render("/",{});  
}

module.exports.loginGet = loginGet;


function loginPost (req, res) {
    if (!req.body.username || !req.body.password) {
      res.send('login failed');
    } else if(req.query.username === "jose" || req.query.password === "hunter2") {
      req.session.user = "jose";
      req.session.admin = true;
    }
  }


  // servicioUsuarios.validate(req.body.username, req.body.password);
  module.exports.loginPost=loginPost