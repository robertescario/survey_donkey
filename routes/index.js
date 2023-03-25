var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHome);
router.get('/home', indexController.displayHome);

module.exports = router;