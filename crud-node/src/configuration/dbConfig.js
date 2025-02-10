const mongooose = require('mongoose');

mongooose.connect("mongodb://localhost:27017/estagio", {
});

mongooose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongooose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongooose;


/*
const connectedToMongoDB = async () => {
    try {
        await mongooose.connect("mongodb://localhost:27017/crud_db");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = {mongooose, connectedToMongoDB};
*/