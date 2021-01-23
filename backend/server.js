import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

import posterData from './data/posters.json'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/posters";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Mongoose model for poster
const Poster = mongoose.model("Poster", {
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
})

if (process.env.RESET_DATABASE) {
  const seedDatabase = async () => {
    await Poster.deleteMany()
  
    posterData.forEach(item => {
      const newPoster = new Poster(item)
      newPoster.save()
    })
  
  }
  seedDatabase()
} 

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

app.get('/posters', async (req, res) => {
  const allPosters = await Poster.find()
  res.json(allPosters)
})

app.get('/posters/:poster_id', async (req, res) => {
  const singlePoster = await Show.findOne({ poster_id: req.params.poster_id })
  res.json(singlePoster)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
