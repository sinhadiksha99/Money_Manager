import config from "./../config/config";
import app from "./express";

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Anuj2014:anuj2014@cluster0.1vkqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// // Connection URL
// mongoose.Promise = global.Promise
// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${config.mongoUri}`)
// })

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
