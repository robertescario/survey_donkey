let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let surveyController = require('../controllers/surveys');

// GET index page of survey
router.get('/', surveyController.displaySurveys);
// GET the ADD survey form
router.get('/add', surveyContoller.displayAddSurvey);
// POST the survey data to create record
router.post('/add', surveyContoller.addSurvey);
// GET the EDIT survey form
router.get('/:id/edit', surveyController.displayEditSurvey);
// POST the survey data to update record with id = :id
router.post('/:id/edit', surveyController.editSurvey);
// GET the page to show survey details
router.get('/:id', surveyContoller.displaySurvey);
// GET process the delete record by survey id
router.get('/:id/delete', surveyController.destroySurvey);

module.exports = router;