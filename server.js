const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const LOG_FILE = path.join(__dirname, "visits.log");

app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip} - URL: ${req.originalUrl}\n`;

    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });

    console.log(logEntry.trim()); 
    next(); 
});

app.get("/api/logs", (req, res) => {
    fs.readFile(LOG_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read logs" });
        }

        const logs = data.trim().split("\n");
        res.json(logs);
    });
});

app.get("/",express.static(path.join(__dirname, "public")) ,(req, res) => {
    res.send("Welcome to Express Server");
});

app.listen(108, () => {
    console.log("Server is running at port 108");
});
