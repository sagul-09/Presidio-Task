import propertyModel from '../model/PropertyModel.js';
import validator from 'validator';

const getAllProperties = async (req, res) => {
    try {
        const getProperties = await propertyModel.find();
        console.log(getProperties);
        return res.status(200).json({ message: "All properties have been retrieved successfully", getProperties });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPropertyByID = async (req, res) => {
    try {
        const getProperty = await propertyModel.findById(req.params.id);
        if (!getProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({ message: "Property has been retrieved successfully", getProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const { title, description, place, area, bedroom, bathroom, price, contactInfo, nearbyFacilities, user } = req.body;

        if (!contactInfo || !contactInfo.email || !validator.isEmail(contactInfo.email)) {
            return res.status(400).json({ message: "Please provide a valid contact email address" });
        }

        if (price <= 0) {
            return res.status(400).json({ message: "Price should be a positive number" });
        }

        const newProperty = await propertyModel.create(req.body);
        return res.status(201).json({ message: "Property has been created successfully", newProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const existingProperty = await propertyModel.findById(req.params.id);
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        if (req.body.price && req.body.price <= 0) {
            return res.status(400).json({ message: "Price should be a positive number" });
        }

        const updatedProperty = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Property has been updated successfully", property: updatedProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const propertyDelete = await propertyModel.findByIdAndDelete(req.params.id);
        if (!propertyDelete) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({ message: "Property has been deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export { getAllProperties, getPropertyByID, createProperty, updateProperty, deleteProperty };
