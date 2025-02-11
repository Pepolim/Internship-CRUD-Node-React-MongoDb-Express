const userService = require("../services/userService");

// The `UserController` class provides the main entry points for managing user-related operations in the application. 
// It handles HTTP requests and responses, and delegates the actual implementation to the `userService` module.
class UserController {
    async createUser(req, res) {
        try {
            const { name, role, email, password, birthdate } = req.body;
            const saveUser = await userService.createUser(name, role, email, password, birthdate);
            res.json(saveUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await userService.getUserById(userId);
            if (!user) 
                return res.status(404).json({ message: "User not found" });
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const updatedData = req.body;
        try {
            const updatedUser = await userService.updateUser(userId, updatedData);
            if (!updatedUser) 
                return res.status(404).json({ message: "User not found" });
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const deletedUser = await userService.deleteUser(userId);
            if (!deletedUser) 
                return res.status(404).json({ message: "User not found" });
            res.json({message: "User deleted successfully",user: deletedUser});
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = new UserController();