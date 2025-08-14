import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookReader, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import Header from "../../components/Header";

const IntroPage = () => {

    useEffect(() => {
      document.title = "IELTS Mock";
    }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header/>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Practice IELTS Anywhere, Anytime 🚀
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Get ready for your IELTS exam with realistic mock tests, instant feedback, and detailed analytics.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/user"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            User
          </Link>
          <Link
            to="/admin"
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition shadow-lg"
          >
            Admin 
          </Link>
        </div>
      </main>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaClipboardList className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real Exam Format</h3>
            <p className="text-gray-600">Experience mock tests designed exactly like the official IELTS exam.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaChalkboardTeacher className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get your results instantly and understand where you can improve.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition">
            <FaBookReader className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Analyze your scores over time and see your improvement journey.</p>
          </div>
        </div>
      </section>
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} IELTS Mock Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default IntroPage