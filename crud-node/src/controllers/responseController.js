const responseService = require("../services/responseService");

class ResponseController {
    async createResponse(req, res) {
        try {
            const { questionID, userID, responseText, responseLikert, responseBoolean, 
                responseTime, responseNumTasks, responseDate, responseArrayOfPredefinedIDs } = req.body;
            const saveResponse = await responseService.createResponse(questionID, userID, responseText, responseLikert, responseBoolean, 
                responseTime, responseNumTasks, responseDate, responseArrayOfPredefinedIDs);
            res.json(saveResponse);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllResponses(req, res) {
        try {
            const responses = await responseService.getAllResponses();
            res.json(responses);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getResponseById(req, res) {
        const responseId = req.params.id;
        try {
            const response = await responseService.getResponseById(responseId);
            if (!response) 
                return res.status(404).json({ message: "Response not found" });
            res.json(response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = new ResponseController();