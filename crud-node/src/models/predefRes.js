const mongoose = require("../configuration/dbConfig");

const predefinedResponsesSchema = new mongoose.Schema({
    
    text: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true, // Removes leading and trailing spaces
    },
    type: {
        type: String,
        required: true,
        enum: [
            "Behavioral Skill",
            "Technical Skill",
            "Difficulty Area",
            "Reason for Communication"
        ]
    }
    
});

const predefinedResponses = mongoose.model('predefined_responses', predefinedResponsesSchema);

module.exports = predefinedResponses;