import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./Components/Auth/AuthForm";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard/TeacherDashboard";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Landing from "./Pages/Landing/Landing";
import LeetCode from "./Components/coding-platforms/LeetCode";
import GitHub from "./Components/coding-platforms/GitHub";
import Codeforces from "./Components/coding-platforms/Codeforces";
import CodeChef from "./Components/coding-platforms/CodeChef";
import Editprofile from "./Components/EditProfile/Editprofile";
import { useState } from 'react';
function App() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="studentdashboard" element={<StudentDashboard />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/leetcode/:username" element={<LeetCode />} />
          <Route path="/github/:username" element={<GitHub />} />
          <Route path="/codeforces/:username" element={<Codeforces />} />
          <Route path="/codechef/:username" element={<CodeChef />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
