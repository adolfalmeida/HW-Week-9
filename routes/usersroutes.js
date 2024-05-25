import express from "express";
import Users from "../controllers/userscontrollers.js";
import auth from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.get("/users", auth, Users.getAll);
userRoutes.post("/register", Users.register);
userRoutes.post("/login", Users.login);
userRoutes.put("/user/:id", auth, Users.put);
userRoutes.delete("/user/:id", auth, Users.delete);

export default userRoutes;
