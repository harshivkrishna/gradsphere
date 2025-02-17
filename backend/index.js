const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  "/assets/uploads",
  express.static(path.join(__dirname, "assets/uploads"))
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/profileDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String, // 'student' or 'teacher'
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  portfolio: String,
  linkedin: String,
  github: String,
  profileImage: String,
  jobDetails: [{ company: String, role: String, description: String }],
  codingProfiles: { leetcode: String, codechef: String, codeforces: String },
  department: String,
  year: Number,
  semester: Number,
  rollNo: String,
  section: String,
});

const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model("Profile", ProfileSchema);

// 🔹 Multer Storage for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// 🔹 Register User
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Login User
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Profile
app.get("/api/profile/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Update Profile
app.post("/api/profile", upload.single("profileImage"), async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const {
      name,
      email,
      mobile,
      portfolio,
      linkedin,
      github,
      jobDetails,
      codingProfiles,
      department,
      year,
      semester,
      rollNo,
      section,
    } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Parse JSON fields
    let jobDetailsParsed, codingProfilesParsed;
    try {
      jobDetailsParsed = JSON.parse(jobDetails);
      codingProfilesParsed = JSON.parse(codingProfiles);
    } catch (error) {
      return res.status(400).json({
        message: "Invalid JSON format in jobDetails or codingProfiles",
      });
    }

    // Handle profile image
    const profileImage = req.file
      ? `/assets/uploads/${req.file.filename}`
      : null;

    // Find or create profile
    let profile = await Profile.findOne({ email });
    if (!profile) {
      profile = new Profile({
        name,
        email,
        mobile,
        portfolio,
        linkedin,
        github,
        profileImage,
        jobDetails: jobDetailsParsed,
        codingProfiles: codingProfilesParsed,
        department,
        year,
        semester,
        rollNo,
        section,
      });
    } else {
      Object.assign(profile, {
        name,
        mobile,
        portfolio,
        linkedin,
        github,
        jobDetails: jobDetailsParsed,
        codingProfiles: codingProfilesParsed,
        profileImage: profileImage || profile.profileImage,
        department,
        year,
        semester,
        rollNo,
        section,
      });
    }

    // Save profile
    await profile.save();
    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
