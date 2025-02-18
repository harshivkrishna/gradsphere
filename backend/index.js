const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  "/assets/uploads",
  express.static(path.join(__dirname, "assets/uploads"))
);

const uri =
  "mongodb+srv://harshivkrishnam:jkI95zYgrsUZ7VVl@gradsphere.yv0fo.mongodb.net/?retryWrites=true&w=majority&appName=gradsphere";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: String, // 'student' or 'teacher'
});

const ProfileSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
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
const upload = multer({ storage });

// 🔹 Register User
app.post("/api/register", async (req, res) => {
  try {
    const { uid, email, name, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ uid, email, name, role });
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
      { uid: user.uid, email: user.email, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role, email: user.email, uid: user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Profile
app.get("/api/profile/:uid", async (req, res) => {
  try {
    const profile = await Profile.findOne({ uid: req.params.uid });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Update Profile
app.put(
  "/api/profile/:uid",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        mobile,
        portfolio,
        linkedin,
        github,
        department,
        year,
        semester,
        rollNo,
        section,
        jobDetails,
        codingProfiles,
      } = req.body;

      const { uid } = req.params;

      if (!uid || !name || !email) {
        return res
          .status(400)
          .json({ message: "UID, name, and email are required" });
      }

      let jobDetailsParsed = [];
      let codingProfilesParsed = {};

      try {
        if (jobDetails) jobDetailsParsed = JSON.parse(jobDetails);
        if (codingProfiles) codingProfilesParsed = JSON.parse(codingProfiles);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid JSON format in jobDetails or codingProfiles",
        });
      }

      const profileImage = req.file
        ? `/assets/uploads/${req.file.filename}`
        : undefined;

      let profile = await Profile.findOne({ uid });

      if (!profile) {
        profile = new Profile({
          uid,
          name,
          email,
          mobile,
          portfolio,
          linkedin,
          github,
          profileImage: profileImage || null,
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
          jobDetails:
            jobDetailsParsed.length > 0 ? jobDetailsParsed : profile.jobDetails,
          codingProfiles:
            Object.keys(codingProfilesParsed).length > 0
              ? codingProfilesParsed
              : profile.codingProfiles,
          profileImage:
            profileImage !== undefined ? profileImage : profile.profileImage,
          department,
          year,
          semester,
          rollNo,
          section,
        });
      }

      await profile.save();
      res.json({ message: "Profile updated successfully", profile });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
