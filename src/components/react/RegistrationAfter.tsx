import { Applicant } from "@/utils/types/Applicant";
import { Company } from "@/utils/types/Company";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export default function RegistrationAfter() {
  const [role, setRole] = useState("candidate");
  const [applicantForm, setApplicantForm] = useState<Applicant>({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    location: '',
    resume: null
  });
  const [recruiterForm, setRecruiterForm] = useState<Company>({
    companyName: '',
    email: '',
    phoneNumber: '',
    recruiterName: '',
    companyWebsite: '',
    industryType: '',
    companySize: '',
    companyLocation: '',
    companyDescription: '',
    companyLogo: ''
  });


  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem('userToken');
    const jobPostData = localStorage.getItem('jobPost');
    const jobPost = JSON.parse(jobPostData!);
    
    if(!token) {
      window.location.href = '/login';
      return;
    }
    if(!jobPostData) {
      window.location.href = '/post-job';
      return;
    }

    // Company Data Filling
    if(jobPost) {
      setRecruiterForm({
        companyName: jobPost.companyName,
        email: jobPost.companyEmail,
        phoneNumber: jobPost.phoneNumber,
        recruiterName: jobPost.recruiterName,
        companyWebsite: jobPost.companyWebsite,
        industryType: jobPost.industryType,
        companySize: jobPost.companySize,
        companyLocation: jobPost.companyLocation,
        companyDescription: jobPost.companyDescription,
        companyLogo: jobPost.companyLogo
      });
    }

    const { data, error } = await actions.tokenToUser({ token: token! });
    console.log(data);

    // Candidate Data Filling
    if(data) {
      setApplicantForm({
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        skills: '',
        experience: '',
        location: '',
        resume: null
      });
    }
    
  }

  const applicantFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  const recruiterFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  return (
    <div className="min-h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="hidden sm:block sm:w-1/2">
        <img className="rounded-2xl" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Details on Job Platform</h2>

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
        <div className="space-y-3 sm:space-y-4">
          {role === "candidate" ? (
            <form onSubmit={applicantFormSubmit} className="space-y-3 sm:space-y-4">
              <input value={applicantForm.name} onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })} type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={applicantForm.email} onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={applicantForm.phone} onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={applicantForm.skills} onChange={(e) => setApplicantForm({ ...applicantForm, skills: e.target.value })} type="text" placeholder="Skills" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input value={applicantForm.experience} onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })} type="number" placeholder="Experience (Years)" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input value={applicantForm.location} onChange={(e) => setApplicantForm({ ...applicantForm, location: e.target.value })} type="text" placeholder="Preferred Job Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input onChange={(e) => setApplicantForm({ ...applicantForm, resume: e.target.files?.[0] ?? null })} type="file" accept=".pdf,.docx" className="w-full text-sm border bg-gray-200 border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 font-semibold" />
              <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                Register as Candidate
              </button>
            </form>
          ) : (
            <form onSubmit={recruiterFormSubmit} className="space-y-3 sm:space-y-4">
              <input value={recruiterForm.companyName} onChange={(e) => setRecruiterForm({ ...recruiterForm, companyName: e.target.value })} type="text" placeholder="Company Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={recruiterForm.email} onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={recruiterForm.phoneNumber} onChange={(e) => setRecruiterForm({ ...recruiterForm, phoneNumber: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={recruiterForm.recruiterName} onChange={(e) => setRecruiterForm({ ...recruiterForm, recruiterName: e.target.value })} type="text" placeholder="Recruiter Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={recruiterForm.companyWebsite} onChange={(e) => setRecruiterForm({ ...recruiterForm, companyWebsite: e.target.value })} type="text" placeholder="Company Website" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input value={recruiterForm.industryType} onChange={(e) => setRecruiterForm({ ...recruiterForm, industryType: e.target.value })} type="text" placeholder="Industry Type" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input value={recruiterForm.companyLocation} onChange={(e) => setRecruiterForm({ ...recruiterForm, companyLocation: e.target.value })} type="text" placeholder="Office Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                Register as Recruiter
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
