const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * Defines the routes for user-related operations.
 * 
 * - `POST /`: Creates a new user.
 * - `GET /`: Retrieves all users.
 * - `GET /:id`: Retrieves a user by their ID.
 * - `PATCH /:id`: Updates a user by their ID.
 * - `DELETE /:id`: Deletes a user by their ID.
 */
router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;