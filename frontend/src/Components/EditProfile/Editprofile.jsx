import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ uid }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profileImage: null,
    jobDetails: [{ company: "", role: "", description: "" }],
    codingProfiles: { leetcode: "", codechef: "", codeforces: "" },
    department: "",
    year: "",
    semester: "",
    rollNo: "",
    section: "",
  });

  useEffect(() => {
    if (!uid) return; // Ensure `uid` is available

    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        if (response.data) {
          setFormData(response.data); // Initialize form data
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [uid]); // Add `uid` to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobDetails = [...formData.jobDetails];
    updatedJobDetails[index][name] = value;
    setFormData((prev) => ({ ...prev, jobDetails: updatedJobDetails }));
  };

  const addJobField = () => {
    setFormData((prev) => ({
      ...prev,
      jobDetails: [
        ...prev.jobDetails,
        { company: "", role: "", description: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "jobDetails" || key === "codingProfiles") {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    if (formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/profile/${uid}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/studentdashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
        encType="multipart/form-data"
      >
        {/* Basic Info */}
        <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Department Info */}
        <h4 className="text-lg font-semibold mt-6 mb-4">
          Department Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Year</label>
            <input
              type="text"
              maxLength={1}
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Semester</label>
            <input
              type="text"
              maxLength={1}
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Roll No.</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Section</label>
            <input
              type="text"
              maxLength={1}
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Social Links */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Social Profiles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Portfolio</label>
            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Job Details */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Job Experience</h4>
        {formData.jobDetails.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={job.company}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={job.role}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={job.description}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={addJobField}
        >
          + Add Job
        </button>

        {/* Coding Profiles */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Coding Profiles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">LeetCode</label>
            <input
              type="text"
              name="leetcode"
              value={formData.codingProfiles.leetcode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  codingProfiles: {
                    ...prev.codingProfiles,
                    leetcode: e.target.value,
                  },
                }))
              }
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">CodeChef</label>
            <input
              type="text"
              name="codechef"
              value={formData.codingProfiles.codechef}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  codingProfiles: {
                    ...prev.codingProfiles,
                    codechef: e.target.value,
                  },
                }))
              }
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">CodeForces</label>
            <input
              type="text"
              name="codeforces"
              value={formData.codingProfiles.codeforces}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  codingProfiles: {
                    ...prev.codingProfiles,
                    codeforces: e.target.value,
                  },
                }))
              }
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Profile Image */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Profile Image</h4>
        <div className="flex flex-col">
          <input
            type="file"
            placeholder="Choose file"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-6 w-full"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
