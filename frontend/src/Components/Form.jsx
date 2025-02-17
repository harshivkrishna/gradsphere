import React, { useState } from "react";
import { useNavigate } from "react-router";

const Form = () => {
  const [leetcode, setLeetcode] = useState("");
  const [codechef, setCodechef] = useState("");
  const [github, setGithub] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const navigate = useNavigate();

  const handleGo = (platform, username) => {
    if (!username) return;
    const urls = {
      leetcode: `/leetcode/${username}`,
      codechef: `/codechef/${username}`,
      github: `/github/${username}`,
      codeforces: `/codeforces/${username}`,
    };
    navigate(urls[platform]);
  };

  return (
    <div className="w-1/2 mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Enter Usernames
      </h2>

      <div className="space-y-2">
        {[
          { name: "LeetCode", state: leetcode, setState: setLeetcode },
          { name: "CodeChef", state: codechef, setState: setCodechef },
          { name: "GitHub", state: github, setState: setGithub },
          { name: "Codeforces", state: codeforces, setState: setCodeforces },
        ].map(({ name, state, setState }) => (
          <div key={name} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`${name} Username`}
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => handleGo(name.toLowerCase(), state)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
