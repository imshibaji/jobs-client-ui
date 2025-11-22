import Hero from "@/components/react/Hero";

export default function JobPostForm() {

  return (
    <div className="min-h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="hidden sm:block sm:w-1/2">
        <Hero />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Post a Job Requirement</h2>

        {/* Form Fields */}
        <form className="space-y-3 sm:space-y-4">
            <>
              <input type="text" placeholder="Job Title" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <textarea placeholder="Job Description" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Salary" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Qualifications" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Experience" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input type="text" placeholder="Skills" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            </>
          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
            Post Job Requirement
          </button>
        </form>
      </div>
    </div>
  );
}