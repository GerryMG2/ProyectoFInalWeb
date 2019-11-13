var auth = function(req, res, next) {
  // TODO: add mongodb implementation
  if (req.session && req.session.user) {
    
    return next();
  } else{
    console.log(req.originalUrl);
    console.log(req.session);
    req.session.returnTo = req.originalUrl; 
    return res.redirect("/login");
  } 
};

module.exports = auth;
