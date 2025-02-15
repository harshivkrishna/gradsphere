const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/profileDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Profile Schema
const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  portfolio: String,
  linkedin: String,
  github: String,
  profileImage: String,
  jobDetails: [{ company: String, role: String, description: String }],
  codingProfiles: { leetcode: String, codechef: String, codeforces: String }
});

const Profile = mongoose.model('Profile', ProfileSchema);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get Profile
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'User not found' });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Profile with Image Upload
app.post('/api/profile', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, mobile, portfolio, linkedin, github, jobDetails, codingProfiles } = req.body;
    
    let profile = await Profile.findOne();
    const profileImage = req.file ? `/uploads/${req.file.filename}` : (profile ? profile.profileImage : '');

    if (!profile) {
      profile = new Profile({
        name,
        email,
        mobile,
        portfolio,
        linkedin,
        github,
        profileImage,
        jobDetails: JSON.parse(jobDetails),
        codingProfiles: JSON.parse(codingProfiles)
      });
    } else {
      profile.name = name;
      profile.email = email;
      profile.mobile = mobile;
      profile.portfolio = portfolio;
      profile.linkedin = linkedin;
      profile.github = github;
      profile.jobDetails = JSON.parse(jobDetails);
      profile.codingProfiles = JSON.parse(codingProfiles);
      if (req.file) profile.profileImage = profileImage;
    }

    await profile.save();
    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
