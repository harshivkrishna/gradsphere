import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./Components/Auth/AuthForm";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Components/TeacherDashboard/TeacherDashboard";
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Landing from "./Pages/Landing/Landing";
function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="studentdashboard" element={<StudentDashboard />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
