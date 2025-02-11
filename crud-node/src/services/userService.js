const User = require("../models/user");

// Provides CRUD (Create, Read, Update, Delete) operations for managing users in the application.
class UserService {
    // Creates a new user in the database.
    async createUser(name, role, email, password, birthdate) {
        try {
            const newuser = new User({ name, email, role, password, birthdate });
            return await newuser.save();
        } catch (error) {
            throw error;
        }
    }

    
    // Retrieves all users from the database.
    async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    }

    // Retrieves a user from the database by their unique identifier.
    async getUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw error;
        }
    }

    
    // Updates an existing user in the database.
    async updateUser(userId, updatedData) {
        try {
            return await User.findByIdAndUpdate(userId, updatedData, { 
                new: true 
            })
        } catch (error) {
            throw error;
        }
    }

    // Deletes a user from the database by their unique identifier.
    async deleteUser(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }

};

module.exports = new UserService();