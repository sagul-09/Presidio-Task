import mongoose from 'mongoose'
// import multer from 'multer';
import validator from 'validator';

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    place:{
        type: String,
        required: true,
    },
    area:{
        type: String,
        required: true,
    },
    bedroom:{
        type: Number,
        required: true,
    },
    bathroom:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    // furnished:{
    //     type: Boolean,
    //     required: true,
    // },
    contactInfo:{
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        phone:{
            type: Number,
            required: true,
        }
    },
    nearbyFacilities: {
        hospital: {
            type: Number,
            required: true,
        },
        college: {
            type: Number,
            required: true,
        },
        shoppingMall: {
            type: Number,
            required: true,
        },
        publicTransport: {
            type: Number,
            required: true,
        },
    },

},
{timestamps: true},
);

const propertyModel = mongoose.model("Property", Schema);

export default propertyModel;