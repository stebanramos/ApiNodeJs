var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let hola = "Hola mundo desde variable"
  res.render('index', { title: 'Express', mensaje: hola });
});

module.exports = router;
