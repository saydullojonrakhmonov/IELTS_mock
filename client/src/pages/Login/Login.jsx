import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <p className="text-gray-500 mb-8">
          Please choose your role
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/admin")}
            className="w-full px-6 py-3 rounded-xl bg-gray-400 hover:bg-gray-900 hover:text-white border-1 text-whitetransition cursor-pointer"
          >
            Continue as Admin
          </button>
          <button
            onClick={() => navigate("/user")}
            className="w-full px-6 py-3 rounded-xl border-blue-600 border-1 text-gray-800 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            Continue as User
          </button>
        </div>
      </div>
    </div>
  );
}
