let express = require('express');
let router = express.Router();
const Survey = require('../models/survey');
const Question = require('../models/question');
const Option = require('../models/option');

module.exports.displaySurveys = (req, res, next) => { 
  // find all surveys in the surveys collection
  Survey.find((err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        surveys: surveys,
        displayName: req.user ? req.user.displayName : ''
      });
    }
    
  });
};

module.exports.displayAddSurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

  }
  else { 
    res.render('surveys/add', {
      title: 'Add Survey',
      surveys: {}, // create an empty surveys object
      displayName: req.user ? req.user.displayName : ''
    });
  }
};

module.exports.addSurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

  }
  else {
    // Get form data from request body
    let newSurvey = Survey({
      title: req.body.title,
      description: req.body.description
    });

    // Save the new survey to the database
    newSurvey.save((err) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        res.redirect('/surveys/' + newSurvey._id);
      }
    });
  }
};

module.exports.displayEditSurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

  }
  else {
    let id = req.params.id;
    Survey.findById(req.params.id, (err, survey) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        res.render('surveys/edit', {
          title: survey.title,
          description: survey.description,
          survey: survey,
          displayName: req.user ? req.user.displayName : ''
        });
      }
    });
  }
};

module.exports.editSurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

  }
  else {
    let id = req.params.id

    let updatedSurvey = Survey({
      _id: id,
      title: req.body.title,
      description: req.body.description
    });
    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        // refresh the book list
        res.redirect('/surveys');
      }
    });
  }
};

module.exports.displaySurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    let id = req.params.id;
    Survey.findById(id).populate({ 
      path: "questions",
      populate: {
        path: "options"
      }
    }).then(survey => {
      //res.json(survey);
       res.render('surveys/show', {
        title: survey.title,
        description: survey.description,
        survey: survey,
        displayName: req.user ? req.user.displayName : ''
      })
    })
  }
};

module.exports.destroySurvey = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');

  }
  else {
    let id = req.params.id;
    Survey.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.redirect('/surveys');
      }

    });
  }
};

module.exports.displayAddQuestion = (req, res, next) => {

};

module.exports.addQuestion = (req, res, next) => {
  // 1. create question
  // 2. get the question id
  // 3. update survey by appending the new question_id to the survey.questions field
};

module.exports.displayEditQuestion = (req, res, next) => {

};

module.exports.editQuestion = (req, res, next) => {

};

module.exports.destroyQuestion = (req, res, next) => {
  // 1. delete question record
  // 2. update survey to remove the question_id from the survey.questions field
};

module.exports.displayAddOption = (req, res, next) => {

};

module.exports.addOption = (req, res, next) => {
  // 1. create option
  // 2. get the new option id
  // 3. update question by appending the new option_id to question.options field
};

module.exports.destroyOption = (req, res, next) => {
  // 1. delete option record
  // 2. update question to remove the option_id from the question.options field
};