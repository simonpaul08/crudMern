const Joi = require('joi');
const mongoose = require('mongoose');
const { questionSchema } = require('./question');
const { Schema } = mongoose;

const testSchema = new mongoose.Schema({
  chapter: { type: Schema.Types.ObjectId, ref: 'Chapter' },
  questions: [questionSchema],
  testNum: {
    type: Number,
    min: 1,
    required: true
  },
  timelimit: {
    type: Number, //minutes
    default: 45
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Test = mongoose.model('Test', testSchema);

function validateTest(test) {
  const schema = {
    chapterId: Joi.objectId().allow(null, ''),
    testNum: Joi.number().min(1).required(),
    timelimit: Joi.number().min(1).required(),
    questions: Joi.array().allow(null)
  };

  return Joi.validate(test, schema);
}

exports.Test = Test;
exports.testSchema = testSchema;
exports.validate = validateTest;