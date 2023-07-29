const mongoose = require("mongoose");


const connectDB = (url) => {
   return mongoose
      .connect(url)
      .then(console.log("Database Connected..."))
}
module.exports = connectDB
