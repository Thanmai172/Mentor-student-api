// MongoDB CONNECTION configuration using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,  // Added for better parsing
            useUnifiedTopology: true,  // Recommended for server discovery
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;
