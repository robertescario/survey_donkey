let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let surveyController = require('../controllers/surveys');

router.get('/', surveyController.displaySurveys);

module.exports = router;