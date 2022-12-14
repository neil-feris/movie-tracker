// route for the movieList endpoint

import express from "express";
import {
  getMovieList,
  getMovieLists,
  createMovieList,
  addMovieToMovieList,
  removeMovieFromMovieList,
  deleteMovieList,
} from "../controllers/movieList.controller.js";

const router = express.Router();

router.get("/", getMovieLists);

router.get("/:id", getMovieList);

router.post("/", createMovieList);

router.put("/", addMovieToMovieList);

router.delete("/", removeMovieFromMovieList);

router.delete("/:id", deleteMovieList);

export default router;
