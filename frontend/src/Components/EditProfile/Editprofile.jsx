import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editprofile.css'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    portfolio: '',
    linkedin: '',
    github: '',
    codingProfiles: {
      leetcode: '',
      codechef: '',
      codeforces: ''
    },
    jobDetails: [{ company: '', role: '', description: '' }],
    profileImage: null
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(response => {
        if (response.data) {
          setFormData(response.data);
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.codingProfiles) {
      setFormData(prev => ({
        ...prev,
        codingProfiles: { ...prev.codingProfiles, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedJobs = [...prev.jobDetails];
      updatedJobs[index][name] = value;
      return { ...prev, jobDetails: updatedJobs };
    });
  };

  const addJob = () => {
    setFormData(prev => ({ ...prev, jobDetails: [...prev.jobDetails, { company: '', role: '', description: '' }] }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'codingProfiles' || key === 'jobDetails') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key === 'profileImage') {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      await axios.post('http://localhost:5000/api/profile', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='edit-container'>
      <h1>Edit Profile</h1>
      <form className='edit-input-box' onSubmit={handleSubmit}>
        <h4 className='input-title'>Personal Information</h4>
        <div className='input-container'>
          <label>Name</label>
          <input type='text' name='name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Mobile</label>
          <input type='tel' maxLength={10} name='mobile' value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className='input-container'>
          <label>Profile Image</label>
          <input type='file' name='profileImage' onChange={handleFileChange} accept='image/*' required />
        </div>
        <div className='input-container'>
          <label>Portfolio Website</label>
          <input type='url' name='portfolio' value={formData.portfolio} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>LinkedIn</label>
          <input type='url' name='linkedin' value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>GitHub</label>
          <input type='url' name='github' value={formData.github} onChange={handleChange} />
        </div>

        <h4 className='input-title'>Job Details</h4>
        {formData.jobDetails.map((job, index) => (
          <div key={index} className='input-container'>
            <label>Company</label>
            <input type='text' name='company' value={job.company} onChange={(e) => handleJobChange(index, e)} required />
            <label>Role</label>
            <input type='text' name='role' value={job.role} onChange={(e) => handleJobChange(index, e)} required />
            <label>Description</label>
            <input type='text' name='description' value={job.description} onChange={(e) => handleJobChange(index, e)} required />
          </div>
        ))}
        <button type='button' onClick={addJob}>Add Job</button>

        <h4 className='input-title'>Coding Profiles</h4>
        <p className='warn-message'>*Enter the username only</p>
        <div className='input-container'>
          <label>Leetcode</label>
          <input type='text' name='leetcode' value={formData.codingProfiles.leetcode} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>CodeChef</label>
          <input type='text' name='codechef' value={formData.codingProfiles.codechef} onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label>Codeforces</label>
          <input type='text' name='codeforces' value={formData.codingProfiles.codeforces} onChange={handleChange} />
        </div>
        <button type='submit' className='form-submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
