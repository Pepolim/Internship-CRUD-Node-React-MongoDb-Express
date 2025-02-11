const Response = require("../models/responses");

class responseService {
    
    async createResponse(questionID, userID, responseText, responseLikert, responseBoolean, 
        responseTime, responseNumTasks, responseDate, responseArrayOfPredefinedIDs) {
        try {
            const newResponse = new Response({ questionID, userID, responseText, responseLikert, responseBoolean, 
                responseTime, responseNumTasks, responseDate, responseArrayOfPredefinedIDs });
            return await newResponse.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllResponses() {
        try {
            return await Response.find();
        } catch (error) {
            throw error;
        }
    }

    async getResponseById(responseId) {
        try {
            return await Response.findById(responseId);
        } catch (error) {
            throw error;
        }
    }


};
module.exports = new responseService();