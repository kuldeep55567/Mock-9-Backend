const express = require("express");
const app = express();
require("dotenv").config()
const {connection} = require("./Config/db")
const {UserRouter} = require("./Controller/UserRoute")
const {PostRouter} = require("./Controller/PostRoute")
app.use(express.json());

app.use("/api",UserRouter)
app.use("/api",PostRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at Port ${process.env.PORT}`);
})