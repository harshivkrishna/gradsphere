import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
    >
      {children}
    </button>
  );
};

const CodeSkills = ({ currentCodingPlatform }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {[
        {
          name: "LeetCode",
          logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
        },
        {
          name: "CodeChef",
          logo: "https://img.icons8.com/?size=100&id=O4SEeX66BY8o&format=png&color=000000",
        },
        {
          name: "Codeforces",
          logo: "https://sta.codeforces.com/s/21991/images/codeforces-sponsored-by-ton.png",
        },
        {
          name: "GitHub",
          logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
      ].map((platform, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-2xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {platform.name}
            </h2>
            <Button
              onClick={() =>
                currentCodingPlatform(() => platform.name.toLowerCase())
              }
            >
              Show
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeSkills;
