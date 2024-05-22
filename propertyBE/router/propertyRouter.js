import express from 'express';
import {getAllProperties, getPropertyByID, createProperty, updateProperty, deleteProperty} from '../controller/propertyController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const propertyRouter = express.Router();

//public routes
propertyRouter.get('/',getAllProperties);
propertyRouter.get('/:id',getPropertyByID);

//private routes
propertyRouter.post('/create',createProperty);
propertyRouter.put('/update/:id',updateProperty);
propertyRouter.delete('/delete/:id',deleteProperty);

export default propertyRouter;