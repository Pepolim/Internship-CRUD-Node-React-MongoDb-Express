const express = require('express');
//const connectedToMongoDB = require('./configuration/dbConfig').connectedToMongoDB;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const questionsRoutes = require('./routes/questionRoute');
const predefResRoutes = require('./routes/predefResRoute');
const responsesRoutes = require('./routes/responseRoute');
const app = express();
const PORT = process.env.PORT || 5000;
/*
connectedToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
});
*/

// Configures the Express application to use the bodyParser middleware to parse JSON request bodies, 
// and the cors middleware to enable cross-origin resource sharing. Also starts the Express server and 
// listens for incoming requests on the specified port, logging a message to the console when the server is running.
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Mounts the userRoutes middleware on the "/api/user" route. 
// This allows all routes defined in the userRoutes module to be accessed under the "/api/user" path.
app.use("/api/user", userRoutes);

app.use("/api/question", questionsRoutes);

app.use("/api/predefRes", predefResRoutes);

app.use("/api/response", responsesRoutes);