const mongoose = require("../configuration/dbConfig");

const responseSchema = new mongoose.Schema({

    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    responseText: {
        type: String,
        maxlength: 300,
        default: null
    },
    responseLikert: {
        type: Number,
        default: null
    },
    responseBoolean: {
        type: Boolean,
        default: null
    },
    responseTime: {
        type: Number,
        default: null
    },
    responseNumTasks: {
        type: Number,
        default: null
    },
    responseDate: {
        type: Date,
        required: true

    },
    responseArrayOfPredefinedIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "predefined_responses",
        default: null
    }
});

const Response = mongoose.model("responses", responseSchema);

module.exports = Response;