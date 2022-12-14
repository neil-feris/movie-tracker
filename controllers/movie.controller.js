// Here we setup the logic for the movies endpoint

// import the movie model
import Movie from "../models/movie.model.js";

// import the query model
import Query from "../models/query.model.js";

// import the config file using dotenv
import dotenv from "dotenv";
dotenv.config();

// read api key from the config file
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_URL;
const IMAGE_URL = process.env.TMDB_IMAGE_URL;
const BACKDROP_URL = process.env.TMDB_BACKDROP_URL;

export const getMovie = async (req, res) => {
  try {
    console.log("getMovie");
    // get the movie id from the request params
    let movieId = req.params.id;
    // check if the movie id is a number
    if (isNaN(movieId)) {
      // if not a number return 400
      return res.status(400).json({ error: "invalid movie id" });
    }
    // check if the movie is in the database
    let movie = await Movie.findOne({ id: movieId });
    // if the movie is not in the database
    if (!movie) {
      // search for the movie in the external api
      let response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
      );
      // if the movie is not found in the external api return 404
      if (response.status === 404) {
        return res.status(404).json({ error: "movie not found" });
      }
      // if the movie is found in the external api
      if (response.status === 200) {
        // get the movie data
        let movieData = await response.json();
        // create a new movie object
        movie = new Movie({
          id: movieData.id,
          title: movieData.title,
          tagline: movieData.tagline,
          overview: movieData.overview,
          runtime: movieData.runtime,
          release_date: movieData.release_date,
          poster_path: IMAGE_URL + movieData.poster_path,
          backdrop_path: BACKDROP_URL + movieData.backdrop_path,
          genres: movieData.genres,
          imdb_id: movieData.imdb_id,
          vote_average: movieData.vote_average,
        });
        // save the movie to the database
        await movie.save();
      }
    }
    // return the movie
    return res.status(200).json(movie);
  } catch (error) {
    // if an error occurs return 500
    return res.status(500).json({ error: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    console.log("getMovies");
    // get the page number from the request query
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    // check if the page number is a number
    if (isNaN(page)) {
      // if not a number return 400
      return res.status(400).json({ error: "invalid page number" });
    }
    // get the movies from the database
    let movies = await Movie.find()
      .limit(20)
      .skip(20 * (page - 1));
    // return the movies
    return res.status(200).json(movies);
  } catch (error) {
    // if an error occurs return 500
    return res.status(500).json({ error: error.message });
  }
};

export const searchMovies = async (req, res) => {
  try {
    console.log("searchMovies");

    // get the search term from the request query
    let searchTerm = req.query.search;
    // check if the search term is empty
    if (!searchTerm) {
      // if the search term is empty return 400
      return res.status(400).json({ error: "search term is required" });
    }
    // check that the search term is a string with a length greater than 2
    if (typeof searchTerm !== "string" || searchTerm.length < 3) {
      // if the search term is not a string or the length is less than 3 return 400
      return res
        .status(400)
        .json({ error: "search term must be a string with a length of 3" });
    }
    // check if the search term is in the database
    let query = await Query.findOne({ query: searchTerm });
    // if the search term is not in the database
    if (!query) {
      // create a new query object
      query = new Query({
        query: searchTerm,
        timestamp: new Date(),
      });
      // save the query to the database
      await query.save();

      // search for the movies in the external api
      let response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      // if the movies are not found in the external api return 404
      if (response.status === 404) {
        return res.status(404).json({ error: "movies not found" });
      }
      // if the movies are found in the external api
      if (response.status === 200) {
        // get the movies data
        let moviesData = await response.json();
        // create an array to store the movies
        let movies = [];
        // loop through the movies data
        for (let movieData of moviesData.results) {
          // check if the movie is in the database
          let movie = await Movie.findOne({ id: movieData.id });
          // if the movie is not in the database
          if (!movie) {
            // create a new movie object
            movie = new Movie({
              id: movieData.id,
              title: movieData.title,
              tagline: movieData.tagline,
              overview: movieData.overview,
              runtime: movieData.runtime,
              release_date: movieData.release_date,
              poster_path: IMAGE_URL + movieData.poster_path,
              backdrop_path: BACKDROP_URL + movieData.backdrop_path,
              genres: movieData.genres,
              imdb_id: movieData.imdb_id,
              vote_average: movieData.vote_average,
            });
            // save the movie to the database
            await movie.save();
          }
          // add the movie to the movies array
          movies.push(movie);
        }
        // return the movies
        return res.status(200).json(movies);
      }
    } else {
      // if the search term is in the database
      // get the movies from the database
      let movies = await Movie.find({
        title: { $regex: searchTerm, $options: "i" },
      });
      // return the movies
      return res.status(200).json(movies);
    }
  } catch (error) {
    // if an error occurs return 500
    return res.status(500).json({ error: error.message });
  }
};
