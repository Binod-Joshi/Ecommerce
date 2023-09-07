const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json()); // to get data from the frontend
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {console.log("Mongodb connected");})
.catch(() => {
    console.log("Not connected to the Mongodb");
})

const authRoute = require("./routes/auth");

app.use("/auth",authRoute);

app.listen(5000,() => {
    console.log(`http://localhost:5000`);
})