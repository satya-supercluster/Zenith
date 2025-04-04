import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { authenticateToken } from "../middlewares/auth.js";

const adminRouter = express.Router();

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const SALT_ROUNDS = 10;

adminRouter.post("/register", authenticateToken, async (req, res) => {
  try {
    const requestingAdmin = await Admin.findById(req.user.id);
    if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: Only super admins can register new admins",
        });
    }

    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      return res
        .status(400)
        .json({ message: "Admin with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new admin
    const newAdmin = new Admin({
      name,
      username,
      password: hashedPassword
    });

    await newAdmin.save();

    const adminData = newAdmin.toObject();
    delete adminData.password;

    res.status(200).json({
      message: "Admin created successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Error in admin registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

adminRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(username," ",password);
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials1" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials2" });
    }

    admin.lastLogin = Date.now();
    await admin.save();

    const payload = {
      id: admin._id,
      username: admin.username,
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        token: `Bearer ${token}`,
        admin: {
          id: admin._id,
          name: admin.name,
          username: admin.username,
        },
      });
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, username, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (name) admin.name = name;

    if (username && username !== admin.username) {
      const usernameExists = await Admin.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already in use" });
      }
      admin.username = username;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({
            message: "Current password is required to set a new password",
          });
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      admin.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    await admin.save();
    const adminData = admin.toObject();
    delete adminData.password;

    res.status(200).json({
      message: "Profile updated successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.get("/list", authenticateToken, async (req, res) => {
  try {
    const requestingAdmin = await Admin.findById(req.user.id);
    if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: Only super admins can access this resource",
        });
    }

    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admin list:", error);
    res.status(500).json({ message: "Server error" });
  }
});


adminRouter.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const requestingAdmin = await Admin.findById(req.user.id);
    if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only super admins can delete admins" });
    }

    if (req.params.id === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default adminRouter;
