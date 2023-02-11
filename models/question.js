const Joi = require('joi');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  choices: [String],
  answer: {
      type: Number,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  audioPath: {
      type: String,
      require: true,
      default: null
  }
})

function validateQuestion(question) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(question, schema);
}

exports.questionSchema = questionSchema;
exports.validate = validateQuestion;