import express from "express";
import { getAllUsers, registerUser, loginUser } from "../controller/userController.js";
const userRouter = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";

//private routes
userRouter.get("/",authMiddleware,getAllUsers);
//public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
