const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.post("/", questionController.createQuestion);

router.get("/", questionController.getAllQuestions);

router.get("/:id", questionController.getQuestionById);


module.exports = router;