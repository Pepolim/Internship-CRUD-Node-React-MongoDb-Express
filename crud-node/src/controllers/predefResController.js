const predefResService = require("../services/predefResService");

class PredefResController {
    async createPredefRes(req, res) {
        try {
            const { text, type } = req.body;
            const savePredefRes = await predefResService.createPredefRes(text, type);
            res.json(savePredefRes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllPredefRes(req, res) {
        try {
            const predefRes = await predefResService.getAllPredefRes();
            res.json(predefRes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPredefResById(req, res) {
        const PredefResId = req.params.id;
        try {
            const predefRes = await predefResService.getPredefResById(PredefResId);
            if (!predefRes) 
                return res.status(404).json({ message: "Predefined Response not found" });
            res.json(predefRes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = new PredefResController();