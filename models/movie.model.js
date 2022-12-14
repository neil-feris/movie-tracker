// We setup all the details stored in the movie model

import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  tagline: { type: String },
  overview: { type: String },
  runtime: { type: Number },
  release_date: { type: String },
  poster_path: { type: String },
  backdrop_path: { type: String },
  genres: { type: Array },
  imdb_id: { type: String },
  vote_average: { type: Number },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
