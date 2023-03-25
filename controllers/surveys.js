let express = require ('express');
let router = express.Router();
let survey = require('../models/survey');
module.exports.displaySurveys = (req, res, next) => {
	// find all surveys in the surveys collection
	survey.find( (err, surveys) => {
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
  }

module.exports.displayAddSurvey = (req, res, next)=>{

}

module.exports.addSurvey = (req, res, next)=>{

}

module.exports.displayEditSurvey = (req, res, next)=>{

}

module.exports.editSurvey = (req, res, next)=>{

} 

module.exports.displaySurvey = (req, res, next)=>{

}

module.exports.destroySurvey = (req, res, next)=>{

}