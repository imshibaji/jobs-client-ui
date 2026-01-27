import Hero from "./Hero";
import { useState } from "react";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    employmentType: '',
    jobLocation: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    salary: '',
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if(!formData.jobTitle || !formData.jobDescription || !formData.employmentType || !formData.jobLocation || !formData.requirements || !formData.responsibilities || !formData.benefits || !formData.salary || !formData.companyName || !formData.companyEmail || !formData.phoneNumber) {
        alert('Please fill in all fields');
        return;
    }
    // Here you would typically handle the form submission, e.g., using fetch
    localStorage.setItem('jobPost', JSON.stringify(formData));
    alert('Job Requirement posted successfully!');
    window.location.href = '/register';
  }

  return (
    <div className="min-h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="hidden sm:block sm:w-1/2">
        <Hero btn1={{text: 'Explore Jobs', link: '/jobs'}} btn2={{text: 'Join the Community', link: '/register'}} />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Post a Job Requirement</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-4">
              <input value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} type="text" placeholder="Job Title: Urgently Required Professional Assistant" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <textarea value={formData.jobDescription} onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })} placeholder="Job Description: Job Responsibilities, Qualifications, etc" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} type="text" placeholder="Requirements: Skills, Experience, etc." className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} type="text" placeholder="Responsibilities: Activities, Tasks, etc" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} type="text" placeholder="Benefits: Benefits, Training, Holidays, etc" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={formData.jobLocation} onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}type="text" placeholder="Location: City, State, Country" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <div className="flex space-x-4">
                <select value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.options[e.target.selectedIndex].value })} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required>
                  <option>Select Employment Type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                  <option value="temporary">Temporary</option>
                </select>
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                  <input value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" placeholder="Salary" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                </div>
              </div>
              {/* Divider */}
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <p className="text-center font-semibold mx-4 mb-0">Company Details</p>
              </div>
              {/* Company Details */}
              <input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}type="text" placeholder="Company Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <div className="flex space-x-4">
                <input value={formData.companyEmail} onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })} type="email" placeholder="Company Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                <input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} type="tel" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
            </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200">
            Post Job Requirement
          </button>
        </form>
      </div>
    </div>
  );
}