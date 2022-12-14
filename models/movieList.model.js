// setup the model for a movielist
import mongoose from "mongoose";

const movieListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movie_ids: { type: Array, required: true },
  author: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const MovieList = mongoose.model("MovieList", movieListSchema);

export default MovieList;
