let express = require ('express');
let router = express.Router();

module.exports.displaySurveys = (req, res, next)=>{
	res.render('surveys/index', {title: "Surveys"});
}