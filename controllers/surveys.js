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
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    let surveyId = req.params.surveyId;
    res.render('questions/add_question', {
      title: 'Add Question',
      surveyId: surveyId,
      displayName: req.user ? req.user.displayName : ''
    });
  }
};

module.exports.addQuestion = (req, res, next) => {
<<<<<<< HEAD
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    let surveyId = req.params.surveyId; // Change this line
    let newQuestion = new Question({
      question_text: req.body.question_text,
      survey: surveyId
    });

    newQuestion.save((err, question) => {
      if (err) {
        console.error(err);
        res.end(err);
      }
      else {
        // Update the survey with the new question
        Survey.findByIdAndUpdate(
          surveyId,
          { $push: { questions: question._id } },
          { new: true, useFindAndModify: false },
          (err, updatedSurvey) => {
            if (err) {
              console.error(err);
              res.end(err);
            }
            else {
              res.redirect('/surveys/' + surveyId);
            }
          }
        );
      }
    });
  }
=======
  // 1. create question
  // 2. get the question id
  // 3. update survey by appending the new question_id to the survey.questions field
>>>>>>> 9bd2efc0b72b824a4ce4d43877cab58fec3f0881
};

module.exports.displayEditQuestion = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    let questionId = req.params.questionId;
    let newOption = new Option({
      option_text: req.body.option_text,
      question: questionId
    });

    newOption.save((err, option) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        // Update the question with the new option
        Question.findByIdAndUpdate(
          questionId,
          { $push: { options: option._id } },
          { new: true, useFindAndModify: false },
          (err, updatedQuestion) => {
            if (err) {
              console.error(err);
              res.end(err);
            } else {
              res.redirect('/surveys'); // Redirect to the desired page, e.g. survey detail page
            }
          }
        );
      }
    });
  }
};

module.exports.editQuestion = (req, res, next) => {

};

module.exports.destroyQuestion = (req, res, next) => {
  // 1. delete question record
  // 2. update survey to remove the question_id from the survey.questions field
};

module.exports.displayAddOption = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.surveyId).populate({ path: 'questions', populate: { path: 'options' } });
    if (!survey) {
      req.flash('error', 'Survey not found');
      return res.redirect('/surveys');
    }

    const question = survey.questions.find(q => q._id.toString() === req.params.questionId);
    if (!question) {
      req.flash('error', 'Question not found');
      return res.redirect(`/surveys/${req.params.surveyId}`);
    }

    res.render('options/add_option', {
      title: 'Add Option',
      surveyId: req.params.surveyId,
      questionId: req.params.questionId,
      survey: survey,
      question: question,
      displayName: req.user ? req.user.displayName : ''
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while loading the page');
    return res.redirect('/surveys');
  }
};

<<<<<<< HEAD
module.exports.addOption = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      req.flash('error', 'Survey not found');
      return res.redirect('/surveys');
    }

    const question = await Question.findById(req.params.questionId);
    if (!question) {
      req.flash('error', 'Question not found');
      return res.redirect(`/surveys/${req.params.surveyId}`);
    }

    const newOption = new Option({
      option_text: req.body.option_text,
      question: question._id
    });

    await newOption.save();
    question.options.push(newOption);
    await question.save();
    req.flash('success', 'Option added successfully');
    return res.redirect(`/surveys/${req.params.surveyId}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while adding the option');
    return res.redirect(`/surveys/${req.params.surveyId}`);
  }
};

module.exports.destroyOption = (req, res, next) => {

};
=======
module.exports.addOption = (req, res, next) => {
  // 1. create option
  // 2. get the new option id
  // 3. update question by appending the new option_id to question.options field
};

module.exports.destroyOption = (req, res, next) => {
  // 1. delete option record
  // 2. update question to remove the option_id from the question.options field
};
>>>>>>> 9bd2efc0b72b824a4ce4d43877cab58fec3f0881
