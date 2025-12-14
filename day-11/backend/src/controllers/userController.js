const User = require("../models/userModel");


// 👉 LOGIN user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }
    
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json({ message: "Login successful", user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 👉 GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 👉 GET single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// 👉 CREATE user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json({
      message: "User created",
      user: savedUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// 👉 UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// 👉 DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
