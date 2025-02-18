/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API calls

const AuthForm = ({ setName }) => {
  const { loginWithFirebase, register, isLogin, setIsLogin } = useAuth();
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast.warn("Please fill in all fields!", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithFirebase(formData.email, formData.password);
        toast.success("Signed in successfully!", { position: "top-right" });
      } else {
        // Register user with Firebase
        const userCredential = await register(
          formData.name,
          formData.email,
          formData.password,
          userType // Pass the selected role
        );

        // Get the Firebase UID
        const uid = userCredential.user.uid;

        // Call backend API to create a database entry
        await axios.post("http://localhost:5000/api/register", {
          uid,
          email: formData.email,
          name: formData.name,
          role: userType,
        });

        toast.success("Account created successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl px-10 py-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Gradsphere
          </h2>
          <p className="text-gray-600">
            {isLogin ? "Sign in to continue" : "Create your account"}
          </p>
        </div>

        {!isLogin && (
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setUserType("teacher")}
              className={`py-3 px-6 rounded-lg flex-1 transition-colors ${
                userType === "teacher"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setUserType("student")}
              className={`py-3 px-6 rounded-lg flex-1 transition-colors ${
                userType === "student"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Student
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleEmailChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ email: "", password: "", name: "" });
            }}
            className="text-gray-800 hover:underline"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
