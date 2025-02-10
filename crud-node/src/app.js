const express = require('express');
//const connectedToMongoDB = require('./configuration/dbConfig').connectedToMongoDB;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const app = express();
const PORT = process.env.PORT || 5000;
/*
connectedToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
});
*/
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use("/api/user", userRoutes);
