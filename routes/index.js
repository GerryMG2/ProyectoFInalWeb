var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
/* GET home page. */
router.get('/main', auth ,function(req, res, next) {
  console.log(req.query.nombre)
  res.render('index', { title: 'Main page', nombre: req.query.nombre });
});


module.exports = router;
