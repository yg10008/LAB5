const express = require("express");
const app = express();
const { db } = require("./config/database");
const productRouter = require("./router/productRouter");
app.use(express.json());

app.use("/products", productRouter);

db()
    .then(() => {
        console.log("CONNECTION_TO_DATABASE_IS_SUCCESSFULLY_ESTABLISHED");
        const PORT = process.env.PORT || 108;
        app.listen(PORT, () => {
            console.log(`SERVER UP ON PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("ERROR_OCCURED_IN_DATABASE_CONNECTION : " + err);
    });