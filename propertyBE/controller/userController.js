import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl";

const getAllUsers = async (req, res) => {
    try {
        const getUsers = await userModel.find();
        return res.status(200).json({ message: "All users have been retrieved successfully", getUsers });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const registerUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.phone) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = await userModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await userModel.create(req.body);
        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: "User has been created successfully", token });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const userExists = await userModel.findOne({ email: req.body.email });
        if (!userExists) {
            return res.status(409).json({ message: "User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: userExists._id, role: userExists.role }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ message: "User has been logged in successfully", token });

    } catch (err) {
        return res.status(500).json({ message: "Login failed", err: err.message });
    }
}

export { getAllUsers, registerUser, loginUser };
