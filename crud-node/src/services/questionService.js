const Question = require("../models/question");

class questionService {
    //In case of new questions, the user must be able to create a new question.
    //For the future
    async createQuestion(TypeQuestionnaire, TextQuestion, Mandatory, Options) {
        try {
            const newQuestion = new Question({ TypeQuestionnaire, TextQuestion, Mandatory, Options });
            return await newQuestion.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllQuestions() {
        try {
            return await Question.find();
        } catch (error) {
            throw error;
        }
    }

    async getQuestionById(questionId) {
        try {
            return await Question.findById(questionId);
        } catch (error) {
            throw error;
        }
    }


};
module.exports = new questionService();