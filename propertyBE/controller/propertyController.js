import propertyModel from '../model/PropertyModel.js';
// import authMiddleware from '../middleware/authMiddleware.js';

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
    //creating a new property
    if (!req.body.place || !req.body.area || req.body.bedroom == null || req.body.bathroom == null || req.body.hospital == null || req.body.college == null) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const newProperty = await propertyModel.create(req.body);
        return res.status(201).json({ message: "Property has been created successfully", newProperty });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        //update property
        const propertyUpdate = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!propertyUpdate) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({ message: "Property has been edited successfully", property: propertyUpdate });
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
