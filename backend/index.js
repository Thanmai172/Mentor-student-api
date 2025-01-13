const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require('body-parser');

const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Register Routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
