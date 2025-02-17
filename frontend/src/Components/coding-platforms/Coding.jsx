import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "../Form";
import CodeChef from "./CodeChef";
import Codeforces from "./Codeforces";
import LeetCode from "./LeetCode";
import Github from "./GitHub";

const UserProfile = ({ platform, username }) => {
  return (
    <div>
      <h2>{platform} Profile</h2>
      <p>Username: {username}</p>
    </div>
  );
};

function Coding() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex justify-center items-center">
            <Form />
          </div>
        }
      />
      <Route path="/leetcode/:username" element={<LeetCode />} />
      <Route path="/codechef/:username" element={<CodeChef />} />
      <Route path="/github/:username" element={<Github />} />
      <Route path="/codeforces/:username" element={<Codeforces />} />
    </Routes>
  );
}

export default Coding;
