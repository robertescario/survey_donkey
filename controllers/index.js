let express = require('express');
let router = express.Router();
let passport = require("passport");

let DB = require('../config/db')

module.exports.displayHome = (req, res, next) => {
	res.render('index', { title: 'Home' });
}
