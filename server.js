// import express
import express from "express";
// import cors for Cross Origin Resource Sharing
import cors from "cors";

// import movies route
import moviesRoute from "./routes/movie.route.js";

// import movieLists route
import movieListsRoute from "./routes/movieList.route.js";

const app = express();

// setup cors
app.use(cors());

// express middleware to parse json we no longer need body-parser
app.use(express.json());

// setup routes anything that doesn't match the routes specified will send a 404
app.use("/api/movies", moviesRoute);
app.use("/api/movielists", movieListsRoute);
// app.use("/api/login", loginRoute);
// app.use("/api/signup", signupRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
