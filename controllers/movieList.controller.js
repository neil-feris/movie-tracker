// setup the logic for movie lists endpoint

import mongoose from "mongoose";

import MovieList from "../models/movieList.model.js";

export const getMovieLists = async (req, res) => {
  try {
    console.log("getMovieLists");
    // get all movie lists from the database
    let movieLists = await MovieList.find();
    // return the movie lists
    return res.status(200).json(movieLists);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};

export const getMovieList = async (req, res) => {
  try {
    console.log("getMovieList");
    // get the id from the request params
    let id = req.params.id;
    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // if not a valid mongodb id return 400
      return res.status(400).json({ error: "invalid id" });
    }

    // get the movie list from the database
    let movieList = await MovieList.findOne({ _id: id });
    // check if the movie list exists
    if (!movieList) {
      // if the movie list does not exist return 404
      return res.status(404).json({ error: "movie list not found" });
    }

    // return the movie list
    return res.status(200).json(movieList);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};

export const createMovieList = async (req, res) => {
  try {
    console.log("createMovieList");
    // get the name from the request body
    let name = req.body.name;
    // check if the name is empty
    if (!name) {
      // if the name is empty return 400
      return res.status(400).json({ error: "name is required" });
    }
    // check that the name is a string with a length greater than 2
    if (typeof name !== "string" || name.length < 3) {
      // if the name is not a string or the length is less than 3 return 400
      return res
        .status(400)
        .json({ error: "name must be a string with a length of 3" });
    }
    // check if the author has already created a movie list with the same name
    let movieList = await MovieList.findOne({
      name: name,
      author: req.body.author,
    });
    // if the movie list exists
    if (movieList) {
      // return 400
      return res.status(400).json({ error: "movie list already exists" });
    }
    // create a new movie list
    movieList = new MovieList({
      name: name,
      movie_ids: [],
      author: req.body.author,
      timestamp: new Date(),
    });
    // save the movie list to the database
    await movieList.save();
    // return the movie list
    return res.status(200).json(movieList);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};

export const addMovieToMovieList = async (req, res) => {
  try {
    console.log("updateMovieList");
    // get the id from the request params
    let id = req.body.id;
    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // if not a valid mongodb id return 400
      return res.status(400).json({ error: "invalid id" });
    }
    console.log("id", id);
    // get the movie list from the database
    let movieList = await MovieList.findOne({ _id: id });
    console.log("movieList", movieList);
    // check if the movie list exists
    if (!movieList) {
      // if the movie list does not exist return 404
      return res.status(404).json({ error: "movie list not found" });
    }
    // get the movie ids from the request body
    let movie_ids = req.body.movie_ids;
    // check if the movie ids is empty
    if (!movie_ids) {
      // if the movie ids is empty return 400
      return res.status(400).json({ error: "movie ids is required" });
    }
    // check that the movie ids is an array
    if (!Array.isArray(movie_ids)) {
      // if the movie ids is not an array return 400
      return res.status(400).json({ error: "movie ids must be an array" });
    }
    // check that the movie ids array is not empty
    if (movie_ids.length === 0) {
      // if the movie ids array is empty return 400
      return res.status(400).json({ error: "movie ids array is empty" });
    }
    // check that the movie ids array only contains numbers
    if (!movie_ids.every((movie_id) => !isNaN(movie_id))) {
      // if the movie ids array does not only contain numbers return 400
      return res
        .status(400)
        .json({ error: "movie ids array must only contain numbers" });
    }
    // for each movie id in the movie ids array check if it already exists in the movie list and if not add it
    movie_ids.forEach((movie_id) => {
      if (!movieList.movie_ids.includes(movie_id)) {
        movieList.movie_ids.push(movie_id);
      }
    });
    // save the movie list to the database
    await movieList.save();
    // return the movie list
    return res.status(200).json(movieList);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};

export const removeMovieFromMovieList = async (req, res) => {
  try {
    console.log("updateMovieList");
    // get the id from the request params
    let id = req.body.id;
    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // if not a valid mongodb id return 400
      return res.status(400).json({ error: "invalid id" });
    }
    console.log("id", id);
    // get the movie list from the database
    let movieList = await MovieList.findOne({ _id: id });
    console.log("movieList", movieList);
    // check if the movie list exists
    if (!movieList) {
      // if the movie list does not exist return 404
      return res.status(404).json({ error: "movie list not found" });
    }
    // get the movie ids from the request body
    let movie_ids = req.body.movie_ids;
    // check if the movie ids is empty
    if (!movie_ids) {
      // if the movie ids is empty return 400
      return res.status(400).json({ error: "movie ids is required" });
    }
    // check that the movie ids is an array
    if (!Array.isArray(movie_ids)) {
      // if the movie ids is not an array return 400
      return res.status(400).json({ error: "movie ids must be an array" });
    }
    // check that the movie ids array is not empty
    if (movie_ids.length === 0) {
      // if the movie ids array is empty return 400
      return res.status(400).json({ error: "movie ids array is empty" });
    }
    // check that the movie ids array only contains numbers
    if (!movie_ids.every((movie_id) => !isNaN(movie_id))) {
      // if the movie ids array does not only contain numbers return 400
      return res
        .status(400)
        .json({ error: "movie ids array must only contain numbers" });
    }
    // for each movie id in the movie ids array check if it exists in the movie list and if so remove it
    movie_ids.forEach((movie_id) => {
      if (movieList.movie_ids.includes(movie_id)) {
        movieList.movie_ids = movieList.movie_ids.filter(
          (id) => id !== movie_id
        );
      }
    });
    // save the movie list to the database
    await movieList.save();
    // return the movie list
    return res.status(200).json(movieList);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};

export const deleteMovieList = async (req, res) => {
  try {
    // get the id from the request params
    let id = req.params.id;
    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // if not a valid mongodb id return 400
      return res.status(400).json({ error: "invalid id" });
    }
    // get the movie list from the database
    let movieList = await MovieList.findOne({ _id: id });
    // check if the movie list exists
    if (!movieList) {
      // if the movie list does not exist return 404
      return res.status(404).json({ error: "movie list not found" });
    }
    // delete the movie list from the database
    await movieList.remove();
    // return the movie list
    return res.status(200).json(movieList);
  } catch (error) {
    // return 500 if there is an error
    return res.status(500).json({ error: error.message });
  }
};
