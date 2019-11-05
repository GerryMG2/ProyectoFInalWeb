var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  console.log(req.query.nombre)
  res.render('index', { title: 'Main page', nombre: req.query.nombre });
});


module.exports = router;
