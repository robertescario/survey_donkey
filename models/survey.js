let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    title: String,
    description: String
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);

