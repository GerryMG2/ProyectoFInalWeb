var express = require('express');
var router = express.Router();
const querystring = require('querystring');
/* GET home page. */
router.get('/register', function (req, res, next) {
  res.render('register_page', { title: 'Registro' });
});

router.post('/register', function (req, res, next) {
  const query = querystring.stringify({
    "nombre": req.body.name,
  });
  res.redirect('/main?' + query);


});



router.get('/login', function (req,res) {
  res.render("login",{});
});

router.post('/login', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('login failed');
  } else if(req.query.username === "jose" || req.query.password === "hunter2") {
    req.session.user = "jose";
    req.session.admin = true;
  }
});



module.exports = router;


