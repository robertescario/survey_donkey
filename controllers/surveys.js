let express = require ('express');
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
        surveys: surveys
      });
    }
  });
};

module.exports.displayAddSurvey = (req, res, next)=>{
  res.render('surveys/add', {
    title: 'Add Survey',
    surveys: {} // create an empty surveys object
  });
};

module.exports.addSurvey = (req, res, next)=>{
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
};

module.exports.displayEditSurvey = (req, res, next)=>{
  Survey.findById(req.params.id, (err, survey) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.render('surveys/details', {
        title: survey.title,
        survey: survey
      });
    }
  });
};

module.exports.editSurvey = (req, res, next)=>{

};

module.exports.displaySurvey = (req, res, next)=>{

};

module.exports.destroySurvey = (req, res, next)=>{
    let id = req.params.id;
    Survey.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys');
        }
        
    });
    

};
