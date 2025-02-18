const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/assets/uploads', express.static(path.join(__dirname, 'assets/uploads')));

const uri = "mongodb+srv://harshivkrishnam:jkI95zYgrsUZ7VVl@gradsphere.yv0fo.mongodb.net/?retryWrites=true&w=majority&appName=gradsphere";

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String // 'student' or 'teacher'
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
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
  section: String
});

const User = mongoose.model('User', UserSchema);
const Profile = mongoose.model('Profile', ProfileSchema);

// 🔹 Multer Storage for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 🔹 Register User
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Login User
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Profile
app.get('/api/profile/:email', async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Update Profile
app.post('/api/profile', upload.single('profileImage'), async (req, res) => {
  try {
    const { 
      name = '', 
      email = '', 
      mobile = '', 
      portfolio = '', 
      linkedin = '', 
      github = '', 
      department = '', 
      year = null, 
      semester = null, 
      rollNo = '', 
      section = '', 
      jobDetails = [], // Default to an empty array
      codingProfiles = { leetcode: '', codechef: '', codeforces: '' } // Default to an empty object
    } = req.body;

    // Parse jobDetails and codingProfiles only if they are strings
    const parsedJobDetails = typeof jobDetails === 'string' ? JSON.parse(jobDetails) : jobDetails;
    const parsedCodingProfiles = typeof codingProfiles === 'string' ? JSON.parse(codingProfiles) : codingProfiles;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let profile = await Profile.findOne({ email });
    const profileImage = req.file ? `/assets/uploads/${req.file.filename}` : profile?.profileImage || '';

    const updatedFields = {
      name, 
      email, 
      mobile, 
      portfolio, 
      linkedin, 
      github,
      jobDetails: parsedJobDetails, 
      codingProfiles: parsedCodingProfiles, 
      profileImage,
      department, 
      year, 
      semester, 
      rollNo, 
      section
    };

    if (!profile) {
      profile = new Profile(updatedFields);
    } else {
      Object.assign(profile, updatedFields);
    }

    await profile.save();
    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));