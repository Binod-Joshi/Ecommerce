const express = require("express");
const app = express();


app.get("/about",(req,res) => {
    res.send("Hello")
})

app.listen(5000,() => {
    console.log(`http://localhost:5000`);
})