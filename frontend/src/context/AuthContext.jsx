import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Register a user and store role in Firestore
  const register = async (name, email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role
      });

      setUser({ uid: user.uid, email, role });
      navigate(role === "teacher" ? "/teacherdashboard" : "/studentdashboard");
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  // Login a user and fetch role from Firestore
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      setUser({ uid: user.uid, email, role });
      navigate(role === "teacher" ? "/teacherdashboard" : "/studentdashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
