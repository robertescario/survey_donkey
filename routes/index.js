var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHome);
router.get('/home', indexController.displayHome);

router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);
router.get('/logout', indexController.performLogout);

module.exports = router;