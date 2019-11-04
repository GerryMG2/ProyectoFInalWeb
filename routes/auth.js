var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express toyota' });
});

router.post('/register', function(req, res, next) {
    res.render('index', { title: 'Express toyota' });
  });



module.exports = router;


