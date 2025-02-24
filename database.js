const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://yg:vqWTQ96RaE1L2prr@nodeyg.sx9dr.mongodb.net/PRODUCT");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = { db };