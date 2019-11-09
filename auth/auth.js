var auth = function(req, res, next) {
    // TODO: add mongodb implementation
    if (req.session && req.session.user === "jose" && req.session.admin)
      return next();
    else
      return res.redirect('/login');
  };


  module.exports = auth;