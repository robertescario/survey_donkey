let express = require('express');
let router = express.Router();
const Survey = require('../models/survey');

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
        res.redirect('/surveys');
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
