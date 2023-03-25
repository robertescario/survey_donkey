let express = require ('express');
let router = express.Router();

module.exports.displaySurveys = (req, res, next)=>{
	res.render('surveys/index', {title: "Surveys"});
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