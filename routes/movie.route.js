// route for movies endpoint
// import express
import express from "express";
// import movies controller
import { getMovie, getMovies, searchMovies } from "../controllers/movie.controller.js";

// create router
const router = express.Router();
// setup routes
router.get("/search/:query", searchMovies);

router.get("/:id", getMovie);

router.get("/", getMovies);


export default router;
