import mongoose from 'mongoose'
import validator from 'validator';

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    contactInfo: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        phone: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const propertyModel = mongoose.model("Property", propertySchema);

export default propertyModel;
