var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/toyota', function(req, res, next) {
  res.render('index', { title: 'Express toyota' });
});

router.get('/kia', function(req, res, next) {
  res.render('index', { title: 'Express kia' });
});

module.exports = router;
