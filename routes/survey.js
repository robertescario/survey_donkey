let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let surveyController = require('../controllers/surveys');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

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
// GET the ADD question form
router.get('/:surveyId/questions/add', surveyController.displayAddQuestion);
// POST the question data to create record
router.post('/:surveyId/questions/add', surveyController.addQuestion);
// GET the EDIT question form
router.get('/:id/questions/:qid/edit', surveyController.displayEditQuestion);
// POST the survey data to update record with id = :id
router.post('/:id/questions/:qid/edit', surveyController.editQuestion);
// GET process the delete record by question id
router.get('/:id/questions/:qid/delete', surveyController.destroyQuestion);


// GET the ADD option form
router.get('/:surveyId/questions/:questionId/options/add', surveyController.displayAddOption);
// POST the option data to create record
router.post('/:surveyId/questions/:questionId/options/add', surveyController.addOption);
// GET process the delete record by option id
router.get('/:id/questions/:qid/options/:oid/delete', surveyController.destroyOption);

module.exports = router;