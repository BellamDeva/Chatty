import express from 'express';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullname: fullName, // ✅ fullName to username
            email,
            password: hashedPassword,
        });

        // Save user and generate token
        await newUser.save();
        generateToken(newUser._id, res);

        // Respond with user data
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                fullname: newUser.fullame,
                email: newUser.email,
                profilePicture: newUser.profilePicture || "",
            }
        });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // ✅

        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user._id, res);
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture || "",
            },
        });
    } catch(error){
        console.error("Invalid Login Credentials: ",error);
        res.status(501).json({ message: "Invalid login credentials" });
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("token","",{maxAge: 0});
        res.status(200).json({ message: "Logout successful" });
    }
    catch(error){
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const update = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const check = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.error("Error checking user:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
};
