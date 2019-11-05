var express = require('express');
var router = express.Router();
const querystring = require('querystring');
/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro' });
});

router.post('/register', function(req, res, next) {
  const query = querystring.stringify({
    "nombre": req.body.name,
});
res.redirect('/main?' + query);
    
  
  });



module.exports = router;


