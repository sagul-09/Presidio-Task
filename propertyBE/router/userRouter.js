import express from "express";
import { getAllUsers, registerUser, loginUser } from "../controller/userController.js";
const userRouter = express.Router();

//private routes
userRouter.get("/",getAllUsers);
//public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
