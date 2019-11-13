var main_page = function(req, res, next) {
    // TODO: add mongodb implementation
    if (req.session && req.session.user) {
        return res.redirect("/main");

    } else{
      next();
    } 
  };
  
  module.exports = main_page;