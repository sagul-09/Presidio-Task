import propertyModel from '../model/PropertyModel.js';
// import authMiddleware from '../middleware/authMiddleware.js';
import validator from 'validator';

const getAllProperties = async (req, res) => {
    //to get all properties
    try {
      const getProperties = await propertyModel.find();
      console.log(getProperties);
      return res
        .status(200)
        .json({ message: "All properties have been retrieved successfully", getProperties });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

const getPropertyByID = async (req, res) => {
    try {
        //search a property using its ID
        const getProperty = await propertyModel.findById(req.params.id);
        return res.status(200).json({ message: "Property has been retrieved successfully", getProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const createProperty = async (req, res) => {
    // Creating a new property
    try {
        // Check if all required fields are provided
        if (!req.body.title || !req.body.description || !req.body.place || !req.body.area || !req.body.bedroom || !req.body.bathroom || !req.body.price || !req.body.contactInfo || !req.body.contactInfo.name || !req.body.contactInfo.email || !req.body.contactInfo.phone || !req.body.nearbyFacilities || !req.body.nearbyFacilities.hospital || !req.body.nearbyFacilities.college || !req.body.nearbyFacilities.shoppingMall || !req.body.nearbyFacilities.publicTransport) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if email is valid
        if (!validator.isEmail(req.body.contactInfo.email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        // Check if price is a positive number
        if (req.body.price <= 0) {
            return res.status(400).json({ message: "Price should be a positive number" });
        }

        // Create a new property
        const newProperty = await propertyModel.create(req.body);

        return res.status(201).json({ message: "Property has been created successfully", newProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const updateProperty = async (req, res) => {
    try {
        // Check if property exists
        const existingProperty = await propertyModel.findById(req.params.id);
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Check if price is a positive number
        if (req.body.price && req.body.price <= 0) {
            return res.status(400).json({ message: "Price should be a positive number" });
        }

        // Update the property
        const updatedProperty = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ message: "Property has been updated successfully", property: updatedProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



const deleteProperty = async (req, res) => {
    try {
        //delete property
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
