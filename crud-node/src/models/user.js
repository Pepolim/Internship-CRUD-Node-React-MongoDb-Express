const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Intern', 'Tutor', 'Admin'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date
    }
    
});

const User = mongoose.model('users', userSchema);

module.exports = User;