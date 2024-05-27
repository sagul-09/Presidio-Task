import express from "express";
import { getAllProperties, getPropertyByID, createProperty, updateProperty, deleteProperty } from "../controller/propertyController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const propertyRouter = express.Router();

// Public routes
propertyRouter.get("/",authMiddleware, getAllProperties);
propertyRouter.get("/:id", getPropertyByID);

// Private routes
propertyRouter.post("/", authMiddleware, roleMiddleware("seller"), createProperty);
propertyRouter.put("/:id", authMiddleware, roleMiddleware("seller"), updateProperty);
propertyRouter.delete("/:id", authMiddleware, roleMiddleware("seller"), deleteProperty);

export default propertyRouter;
