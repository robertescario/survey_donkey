let mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a model class
let Survey = mongoose.Schema({
    title: String,
    description: String,
    survey_count: Number,
    questions: [{
      type: Schema.Types.ObjectId,
      ref: "Question"
    }]
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);

