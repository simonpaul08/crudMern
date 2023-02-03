const mongoose = require('mongoose');
const { Schema } = mongoose

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    choice: [{
        type: String,
        required: true
    }],
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

const TestSchema = new Schema(
    {
        chapter: {
            type: Number,
            required: true
        },
        testNum: {
            type: Number,
            required: true
        },
        timelimit: {
            type: Number, //minutes
            default: 45
        },
        questions: [questionSchema],
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
    }
)

module.exports = mongoose.model('Test', TestSchema) 