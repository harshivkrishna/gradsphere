import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./Components/Auth/AuthForm";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard/TeacherDashboard";
import Profile from "./Components/StudentDashboard/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Landing from "./Pages/Landing/Landing";
import LeetCode from "./Components/coding-platforms/LeetCode";
import GitHub from "./Components/coding-platforms/Github";
import Codeforces from "./Components/coding-platforms/Codeforces";
import CodeChef from "./Components/coding-platforms/CodeChef";
import Editprofile from "./Components/EditProfile/Editprofile";
import AcademicPerformance from "./Components/StudentDashboard/AcademicPerformance";

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/leetcode/:username" element={<LeetCode />} />
        <Route path="/github/:username" element={<GitHub />} />
        <Route path="/codeforces/:username" element={<Codeforces />} />
        <Route path="/codechef/:username" element={<CodeChef />} />
        {/* student Dashboard components */}
        <Route
          path="/studentdashboard/academic-performance"
          element={<AcademicPerformance />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
