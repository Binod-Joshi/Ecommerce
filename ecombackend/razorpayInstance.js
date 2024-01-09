// razorpayInstance.js
  //By organizing code this way, you can avoid circular dependencies, and the warning should be resolved. 
  //Ensure that you replace the paths and filenames with your actual project structure.
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = instance;
