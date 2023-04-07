let mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a model class
let Option = mongoose.Schema({
    option_text: String,
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
},
{
  collection: "options"
});

module.exports = mongoose.model('Option', Option);
