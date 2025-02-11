const express = require("express");
const responseController = require("../controllers/responseController");

const router = express.Router();

router.post("/", responseController.createResponse);

router.get("/", responseController.getAllResponses);

router.get("/:id", responseController.getResponseById);


module.exports = router;