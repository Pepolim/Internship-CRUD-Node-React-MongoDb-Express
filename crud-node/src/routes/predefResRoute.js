const express = require("express");
const predefResController = require("../controllers/predefResController");

const router = express.Router();

router.post("/", predefResController.createPredefRes);

router.get("/", predefResController.getAllPredefRes);

router.get("/:id", predefResController.getPredefResById);


module.exports = router;