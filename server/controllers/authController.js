import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'; //*
import jwt from "jsonwebtoken"; //*

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (!name || !email || !password || !confirmPassword) {
    console.log("All fields are required");
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (password.length < 8) {
    console.log("Password must be at least 8 characters long.");
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log("user already exist");
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new UserModel(data); 
    const user = await newUser.save();  
    
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    return res.status(201).json({ message: "Signup successful", token, userData: userWithoutPassword });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: 'Error signing up', error: error.message });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("data i login", email, password);
    

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      console.log("User doesn't exist. Please recheck your email.");
      return res.status(400).json({ message: "User doesn't exist. Please recheck your email." });
    }
    console.log("existingUser.password", existingUser);
    
    if (!existingUser.password) {
      console.log("Password not set for user, cannot log in.");
      return res.status(400).json({ message: "Password not set for this user." });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      console.log("invalid password");
      return res.status(400).json({ message: "invalid credentials." });
    }

  

    const token = jwt.sign({ _id: existingUser._id, name: existingUser.name, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const userWithoutPassword = existingUser.toObject();  
    delete userWithoutPassword.password; 

    return res.status(200).json({ message: 'Login successful', token, userData: userWithoutPassword });  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error signing up", error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
