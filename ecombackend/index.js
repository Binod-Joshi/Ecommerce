const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json({limit:"10mb"})); // to get data from the frontend
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {console.log("Mongodb connected");})
.catch(() => {
    console.log("Not connected to the Mongodb");
})

const authRoute = require("./routes/auth");
const authAdminp = require("./routes/admin/productsRelated");
const authSeller = require("./routes/admin/ProductOfSingleSeller");
const authAdminShippingRelated = require("./routes/admin/shippingRelated");

app.use("/auth",authRoute);
app.use("/auth/sellerp",authAdminp);
app.use("/auth/seller",authSeller) // products of particular seller
app.use("/auth/cshipping",authAdminShippingRelated);

app.listen(5000,() => {
    console.log(`http://localhost:5000`);
})