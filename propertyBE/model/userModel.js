import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone:{
        type: Number,
        required: true,
        match: [/^\d{10}$/, 'Please provide a 10 digit phone number']
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
},
    {timestamps: true},
);

Schema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10); 
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

const userModel = mongoose.model('User', Schema);

export default userModel;