const mongoose = require("../configuration/dbConfig");

const questionsSchema = new mongoose.Schema({
    
    TypeQuestionnaire: {
        type: String,
        enum: ["DiarioEstagiario", "FeedbackEstagiario", "DiarioTutor"],
        required: true
    },
    TextQuestion: {
        type: String,
        maxlength: 500,
        required: true
    },
    Mandatory: {
        type: Boolean,
        required: true
    },
    Options: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    }
    
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;