const questionService = require("../services/questionService");

class QuestionController {
    async createQuestion(req, res) {
        try {
            const { TypeQuestionnaire, TextQuestion, Mandatory, Options } = req.body;
            const saveQuestion = await questionService.createQuestion(TypeQuestionnaire, TextQuestion, Mandatory, Options);
            res.json(saveQuestion);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllQuestions(req, res) {
        try {
            const questions = await questionService.getAllQuestions();
            res.json(questions);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getQuestionById(req, res) {
        const questionId = req.params.id;
        try {
            const question = await questionService.getQuestionById(questionId);
            if (!question) 
                return res.status(404).json({ message: "Question not found" });
            res.json(question);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = new QuestionController();