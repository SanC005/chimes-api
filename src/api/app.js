console.log("nodemon working...");
require('express-async-errors');
const express = require("express");
const connectDB = require("../database/connect");
const notFound = require('../middleware/not-found')
const errorHandlerMiddleware = require('../middleware/error-handler')
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 5001;
const posts = require("../routes/posts");
const path = require("path");
const accounts = require("../routes/accounts");
const auth = require('../middleware/auth');

//middleware
app.use(express.static(path.join(__dirname, "../webpages")));
app.use(express.json());

//routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/api/v1", posts);
app.use("/api/v2/posts",auth,posts);
app.use("/api/v2/auth",accounts);
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
  try {
    await connectDB(process.env.NEXT_PUBLIC_MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
