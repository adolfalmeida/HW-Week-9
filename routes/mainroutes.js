import express from "express";
import userRoutes from "./usersroutes.js";
import moviesRoutes from "./moviesroutes.js";

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api", moviesRoutes);

export default router;
