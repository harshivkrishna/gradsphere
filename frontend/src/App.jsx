import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./Components/Auth/AuthForm";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard/TeacherDashboard";
import Profile from "./Components/StudentDashboard/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Landing from "./Pages/Landing/Landing";
import Editprofile from "./Components/EditProfile/Editprofile";

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/studentdashboard/:uid" element={<StudentDashboard />} />
        <Route path="/teacherdashboard/:uid" element={<TeacherDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
