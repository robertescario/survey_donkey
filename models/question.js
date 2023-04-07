let mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a model class
let Question = mongoose.Schema({
    question_text: String,
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: "Option"
      }]
},
{
  collection: "questions"
});

module.exports = mongoose.model('Question', Question);