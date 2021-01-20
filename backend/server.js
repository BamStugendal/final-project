import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Mongoose model for poster
const User = mongoose.model("Poster", {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  width: {
    type: Number,
  },
  higth: {
    type: Number,
  },
  image: {
    type: String,
  },
});

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
  console.log('test')
  res.send('Hello world')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
