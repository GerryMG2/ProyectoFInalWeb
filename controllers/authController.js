const querystring = require('querystring');


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

  module.exports.loginPost=loginPost