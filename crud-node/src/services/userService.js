const User = require("../models/user");

class UserService {
    async createUser(name, role, email, password, birthdate) {
        try {
            const newuser = new User({ name, email, role, password, birthdate });
            return await newuser.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, updatedData) {
        try {
            return await User.findByIdAndUpdate(userId, updatedData, { 
                new: true 
            })
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }

};
module.exports = new UserService();