import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required.." });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    let adminRef = null;
    if (role == "admin") {
      const admin = await Admin.create({
        name,
        email,
        password: hashPwd,
      });
      adminRef = admin._id;
      await admin.save();

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });

      res.json({
        token,
        admin,
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashPwd,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email & password required" });

    const user_or_admin =
      (await User.findOne({ email, isDeleted: false })) ||
      (await Admin.findOne({ email }));
    // console.log(user_or_admin);

    if (!user_or_admin)
      return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user_or_admin.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user_or_admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "10d",
    });
    res.json({
      token,
      user_or_admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
