import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ currentSection }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profileImage: "",
    jobDetails: [],
    codingProfiles: { leetcode: "", codechef: "", codeforces: "" },
    department: "",
    year: "",
    semester: "",
    rollNo: "",
    section: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile")
      .then((response) => {
        if (response.data.message === "User not found") {
          navigate("/editprofile");
        } else {
          setUser(response.data);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Section - Profile Image, Work Experience, Skills */}
          <div className="md:w-1/3 p-6 border-r border-gray-200">
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4"
                src={
                  user.profileImage
                    ? `http://localhost:5000${user.profileImage}`
                    : "/assets/profile.jpg"
                }
                alt="Profile"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {user.name || "Your Name"}
              </h1>
              <h4 className="text-gray-600">Full Stack Developer</h4>
            </div>

            {/* Work Experience */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800">
                Work Experience
              </h4>
              {user.jobDetails.length > 0 ? (
                user.jobDetails.map((job, index) => (
                  <div key={index} className="mt-4">
                    <h6 className="text-lg font-medium text-gray-700">
                      {job.company} - {job.role}
                    </h6>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No job details available</p>
              )}
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800">Skills</h4>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">Java</li>
                <li className="text-gray-600">C++</li>
                <li className="text-gray-600">JavaScript</li>
                <li className="text-gray-600">HTML</li>
                <li className="text-gray-600">Python</li>
                <li className="text-gray-600">Tailwind CSS</li>
              </ul>
            </div>
          </div>

          {/* Right Section - User Details */}
          <div className="md:w-2/3 p-6">
            {/* Edit Profile Button */}
            <button
              className="flex items-center justify-end space-x-2 text-blue-600 hover:text-blue-800"
              onClick={() => currentSection(() => "edit-profile")}
            >
              <h6 className="text-lg">Edit Profile</h6>
              <i className="bx bx-edit-alt text-xl"></i>
            </button>

            {/* Department Information */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800">
                Department Information
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h6 className="text-gray-600">Department</h6>
                  <p className="text-gray-800">
                    {user.department || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600">Year</h6>
                  <p className="text-gray-800">{user.year || "Not provided"}</p>
                </div>
                <div>
                  <h6 className="text-gray-600">Semester</h6>
                  <p className="text-gray-800">
                    {user.semester || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600">Roll No.</h6>
                  <p className="text-gray-800">
                    {user.rollNo || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600">Section</h6>
                  <p className="text-gray-800">
                    {user.section || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h6 className="text-gray-600">Phone</h6>
                  <p className="text-gray-800">
                    {user.mobile || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600">Email</h6>
                  <p className="text-gray-800">
                    {user.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600">Portfolio</h6>
                  <a
                    href={user.portfolio || "#"}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.portfolio || "Not provided"}
                  </a>
                </div>
                <div>
                  <h6 className="text-gray-600">LinkedIn</h6>
                  <a
                    href={user.linkedin || "#"}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.linkedin || "Not provided"}
                  </a>
                </div>
                <div>
                  <h6 className="text-gray-600">Github</h6>
                  <a
                    href={user.github || "#"}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.github || "Not provided"}
                  </a>
                </div>
              </div>
            </div>

            {/* Coding Profiles */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800">
                Coding Profiles
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h6 className="text-gray-600">LeetCode</h6>
                  <a
                    href={
                      user.codingProfiles.leetcode
                        ? `https://leetcode.com/${user.codingProfiles.leetcode}`
                        : "#"
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.codingProfiles.leetcode || "Not provided"}
                  </a>
                </div>
                <div>
                  <h6 className="text-gray-600">CodeChef</h6>
                  <a
                    href={
                      user.codingProfiles.codechef
                        ? `https://www.codechef.com/users/${user.codingProfiles.codechef}`
                        : "#"
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.codingProfiles.codechef || "Not provided"}
                  </a>
                </div>
                <div>
                  <h6 className="text-gray-600">Codeforces</h6>
                  <a
                    href={
                      user.codingProfiles.codeforces
                        ? `https://codeforces.com/profile/${user.codingProfiles.codeforces}`
                        : "#"
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.codingProfiles.codeforces || "Not provided"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
