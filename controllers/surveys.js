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
      description: req.body.description,
      survey_count: 0
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
  if (!req.user) {
    //res.redirect('/login');
    let id = req.params.id;
    Survey.findById(id).populate({ 
      path: "questions",
      populate: {
        path: "options"
      }
    }).then(survey => {
      //res.json(survey);
      res.render('surveys/submission', {
        title: survey.title,
        description: survey.description,
        survey: survey
      })
    })
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
    res.render('questions/add', {
      title: 'Add Question',
      surveyId: surveyId,
      displayName: req.user ? req.user.displayName : ''
    });
  }
};

module.exports.addQuestion = (req, res, next) => {
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
};

module.exports.displayEditQuestion = (req, res, next) => {
  
  Question.findById(req.params.qid, (err, question) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        res.render('questions/edit', {
          question: question,
          title:'Edit Question',
          displayName: req.user ? req.user.displayName : ''
        });
      }
    });
};

module.exports.editQuestion = (req, res, next) => {

  if (!req.user) {
    res.redirect('/login');
  } else {
    let questionId = req.params.qid;

    let updateQuestion = new Question({
      _id: questionId,
      survey: req.params.id,
      question_text: req.body.question_text
    });

    
  Question.updateOne({_id: questionId}, updateQuestion,(err) =>{
     if (err) {
      console.error(err);
      res.end(err);
    }else{
      res.redirect('/surveys/' + req.params.id);

    } })

   
  }

};

module.exports.destroyQuestion = (req, res, next) => {
    let questionId = req.params.qid;
    Question.remove({_id: questionId}, (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        // Redirect the user back to the survey page after the question is deleted
        res.redirect('/surveys/' + req.params.id);
      }
    });
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

    res.render('options/add', {
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
      option_count: 0,
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
  let optionId = req.params.oid;
  Option.findByIdAndRemove(optionId, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      // Redirect to survey page after the option is deleted
      return res.redirect('/surveys');
    }
  });
};

module.exports.submitSurvey = async (req, res, next) => {
  try{
    let id = req.params.id;
    Survey.findById(id).populate({ 
      path: "questions",
      populate: {
        path: "options"
      }
    }).then(survey => {
      let newCount = 1;
      if(!isNaN(survey.survey_count)){
        newCount = survey.survey_count + 1;
      }
      survey.survey_count = newCount;
      survey.save();
      for( let count=1; count <= survey.questions.length; count++) {
        let key = "question" + count;
        optionId = req.body[key];
        
        Option.findById(optionId).then(option => {
          let newValue = 1;
          if(isNaN(option.option_count)) {
            newValue = 1;
          }
          else {
            newValue = option.option_count + 1;
          }
          option.option_count = newValue;
          option.save(); 
        });
      }
    });
    return res.redirect('/surveys');
  }
  catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while submitting survey.');
    return res.redirect(`/surveys/${req.params.id}`);
  }
  
  
};
