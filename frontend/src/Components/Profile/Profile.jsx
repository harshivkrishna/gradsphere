import React from 'react'
import './Profile.css'
const Profile = () => {
  return (
    <div className='profile-container'>
        <div className='profile-img-container'>
            <img className='profile-img' src="/assets/profile.jpg" alt="" />
            <div className='work-container'>
            <h4 className='profile-title'>Work</h4>
            <h6>Amazon - SDE Intern</h6>
            <p>2 months intern at Amazon bengaluru.</p>

            <h6>Amazon - SDE Intern</h6>
            <p>2 months intern at Amazon bengaluru.</p>
            </div>
            <div className='skills-container'>
                <h4 className='profile-title'>Skills</h4>
                <ul>
                    <li>java</li>
                    <li>C++</li>
                    <li>HTML</li>
                    <li>Tailwind css</li>
                    <li>Javascript</li>
                </ul>
            </div>
        </div>

        <div className="description-container">
            <a href="#">
            <div className='edit-profile-container'>
                <h6>Edit Profile</h6>
                <i className='bx bx-edit-alt' ></i>
            </div>
            </a>
            <h1>Jeremy Jose</h1>
            <h4 className='role'>Full Stack Developer</h4>

            <div className='rank-container'>
                <h3>Rank : 3838/9022</h3>
                <div className="star-rating-container">
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                <i className='bx bxs-star'></i>
                </div>
            </div>
            <h4>Contact Information</h4>
            <div className='info-parent-container'>
            <div className='info-container'>
                <h6>Phone  </h6>
                <p>1234567890</p>
            </div>
            <div className='info-container'>
                <h6>Email</h6>
                <p>Sample@gmail.com</p>
            </div>
            <div className='info-container'>
                <h6>Portfolio </h6>
                <a href="#">https://myportfolio.com</a>
            </div>
            <div className='info-container'>
                <h6>Linkedin </h6>
                <a href="#">https://myportfolio.com</a>
            </div>
            <div className='info-container'>
                <h6>Github  </h6>
                <a href="#">https://myportfolio.com</a>
            </div>
            </div>
                    <h4>Coding platform Profiles</h4>
            <div className='coding-profile-container'>
                <div className="code-profile-container">
                    <h6>Leetcode  </h6>
                    <a href="#">username</a>
                </div>
                <div className="code-profile-container">
                    <h6>Codechef  </h6>
                    <a href="#">username</a>
                </div>
                <div className="code-profile-container">
                    <h6>GeeksforGeeks  </h6>
                    <a href="#">username</a>
                </div>
                <div className="code-profile-container">
                    <h6>CodeForces  </h6>
                    <a href="#">username</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile