import React, { useState } from "react";

export default function RegistrationForm() {
  const [role, setRole] = useState("candidate");

  return (
    <div className="min-h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="hidden sm:block sm:w-1/2">
        <img className="rounded-2xl" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Register on Job Platform</h2>

        {/* Role Selector */}
        <div className="flex flex-row justify-around gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => setRole("candidate")}
            className={`px-4 py-2 rounded-lg flex-1 ${
              role === "candidate" ? "bg-violet-600 text-white" : "bg-gray-200"
            } transition duration-200`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`px-4 py-2 rounded-lg flex-1 ${
              role === "recruiter" ? "bg-violet-600 text-white" : "bg-gray-200"
            } transition duration-200`}
          >
            Recruiter
          </button>
        </div>

        {/* Form Fields */}
        <form className="space-y-3 sm:space-y-4">
          {role === "candidate" ? (
            <>
              <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <hr className="border-gray-300 mt-3 mb-3" />
              <input type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Skills" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="number" placeholder="Experience (Years)" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="text" placeholder="Preferred Job Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="file" accept=".pdf,.docx" className="w-full text-sm border bg-gray-200 border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 font-semibold" />
            </>
          ) : (
            <>
              <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <hr className="border-gray-300 mt-3 mb-3" />
              <input type="text" placeholder="Company Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Recruiter Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Company Website" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="text" placeholder="Industry Type" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="text" placeholder="Office Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </>
          )}

          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        {/* Social Login */}
        <div className="flex gap-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            <i className="fab fa-facebook-f mr-2"></i> Register with Facebook
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
            <i className="fab fa-google mr-2"></i> Register with Google
          </button>
        </div>

      </div>
    </div>
  );
}
