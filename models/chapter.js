const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Test } = require('./test');
const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    maxlength: 50
  },
  number: {
    type: Number,
    required: true
  },
  isExam: {
    type: Boolean,
    default: false
  },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }]
});

const Chapter = mongoose.model('Chapter', chapterSchema);

function validateChapter(chapter) {
  const schema = {
    name: Joi.string().max(50),
    number: Joi.number().required(),
    tests: Joi.array().allow(null)
  };

  return Joi.validate(chapter, schema);
}

exports.chapterSchema = chapterSchema;
exports.Chapter = Chapter; 
exports.validate = validateChapter;