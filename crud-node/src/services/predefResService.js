const PredefRes = require("../models/predefRes");

class predefResService {
    
    async createPredefRes(text, type) {
        try {
            const newPredefRes  = new predefRes({ text, type });
            return await newPredefRes.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllPredefRes() {
        try {
            return await PredefRes.find();
        } catch (error) {
            throw error;
        }
    }

    async getPredefResById(predefResId) {
        try {
            return await PredefRes.findById(predefResId);
        } catch (error) {
            throw error;
        }
    }


};
module.exports = new predefResService();