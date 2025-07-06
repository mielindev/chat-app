import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import cloudinary from "../lib/cloudinary.js";
const authController = {
  // Signup route handler function
  signup: async (req, res) => {
    // Get user data
    const { email, fullName, password } = req.body;
    try {
      if (!email || !fullName || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      const user = await User.findOne({ email });

      if (user) return res.status(400).json({ message: "User already exists" });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({
        email,
        fullName,
        password: hashedPassword,
      });

      if (newUser) {
        // Generate token
        generateToken(newUser._id, res);
        await newUser.save();

        return res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
        });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // Login route handler function
  login: async (req, res) => {
    const { password, email } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Your email or password is incorrect" });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: "Your email or password is incorrect" });
      }

      // Generate token
      generateToken(user._id, res);
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  logout: (req, res) => {
    try {
      res.cookie("jwt", "", {
        maxAge: 0,
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.log("Error in logout controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;

      if (!profilePic) {
        return res.status(400).json({ message: "Profile picture is required" });
      }

      const uploadResult = await cloudinary.uploader.upload(profilePic);

      // Update user profile picture
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: uploadResult.secure_url,
        },
        {
          new: true,
        }
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error in updateProfile controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  checkAuth: (req, res) => {
    try {
      const data = req.user;
      res.status(200).json(data);
    } catch (error) {
      console.log("Error in checkAuth controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;
