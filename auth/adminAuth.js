var admin = function(req, res, next) {
    // TODO: add mongodb implementation
    console.log(req.session.admin);
    if (req.session && req.session.user && req.session.admin) {
      
      return next();
    } else{
      console.log(req.originalUrl);
      console.log(req.session);
      req.session.returnTo = req.originalUrl; 
      return res.redirect("/main");
    } 
  };
  
  module.exports = admin;
  