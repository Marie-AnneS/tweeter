"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// const db = require("./lib/in-memory-db");
let db;

MongoClient.connect(MONGODB_URI, (err, mongoDb) => {
  if (err) {
    console.log("Cannot connect to MongoDB:", err);
    process.exit(1);
  }
  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  db = mongoDb;
  console.log("patata", db);

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
