let mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a model class
let Survey = mongoose.Schema({
    title: String,
    description: String,
    questions: [{
      type: Schema.Types.ObjectId,
      ref: "Question"
    }]
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);

