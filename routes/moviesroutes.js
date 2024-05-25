import express from "express";
import Movies from "../controllers/moviescontrollers.js";
import auth from "../middlewares/auth.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/movies", auth, Movies.getAll);
moviesRoutes.post("/movies", auth, Movies.register);
moviesRoutes.put("/movies/:id", auth, Movies.put);
moviesRoutes.delete("/movies/:id", auth, Movies.delete);

export default moviesRoutes;
