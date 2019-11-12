const querystring = require('querystring');
const serviceUsers = require("../services/userService");


function loginGet(req,res){
    res.render("login",{title: "login" , msg: ""});  
}

module.exports.loginGet = loginGet;


async function loginPost (req, res) {
    if (!req.body.username || !req.body.password) {
      res.send('login failed');
    } else if(req.query.username === "jose" || req.query.password === "hunter2") {
      req.session.user = "jose";
      req.session.admin = true;
    }
  }


  // servicioUsuarios.validate(req.body.username, req.body.password);
  module.exports.loginPost=loginPost