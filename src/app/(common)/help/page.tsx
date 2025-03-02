import React from "react";

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-82px)]">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-yellow-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11V7m0 4v8m-4-4h8"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600">
          We're working hard to bring this page to life. Please check back
          later!
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
