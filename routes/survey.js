let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let surveyController = require('../controllers/surveys');

// GET index page of survey
router.get('/', surveyController.displaySurveys);
// GET the ADD survey form
router.get('/add', surveyController.displayAddSurvey);
// POST the survey data to create record
router.post('/add', surveyController.addSurvey);
// GET the EDIT survey form
router.get('/:id/edit', surveyController.displayEditSurvey);
// POST the survey data to update record with id = :id
router.post('/:id/edit', surveyController.editSurvey);
// GET the page to show survey details
router.get('/:id', surveyController.displaySurvey);
// GET process the delete record by survey id
router.get('/:id/delete', surveyController.destroySurvey);

module.exports = router;