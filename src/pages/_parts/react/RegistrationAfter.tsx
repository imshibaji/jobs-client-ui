import { useEffect, useState } from "react";
import ApplicantForm from "./ApplicantForm";
import CompanyForm from "./CompanyForm";
import { actions } from "astro:actions";
import { Applicant } from "@/utils/types/Applicant";
import { User } from "@/utils/types/User";

export default function RegistrationAfter() {
  const [role, setRole] = useState("candidate");
  const [token, setToken] = useState("");
  const [applicant, setApplicant] = useState({} as Applicant);
  const [jobPost, setJobPost] = useState({});

  useEffect(() => {
    init();
  }, []);

  const init = async () => {  
    const token = localStorage.getItem('userToken');
    const jobPostData = localStorage.getItem('jobPost');

    if(!token) {
      window.location.href = '/register';
      return;
    }else{
      setToken(token);
      const { data } = await actions.tokenToUser({token}) as { data: User };
      console.log(data);

      if(!data) {
        alert('You are not logged in! Please login.');
        window.location.href = '/login';
        return;
      }
      setApplicant({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        skills: '',
        experience: '',
        location: '',
        resume: '',
        userId: Number(data.id)
      });

      // Set Job Post for Company
      const companyData = JSON.parse(jobPostData ?? '{}');
      setJobPost({
        ...companyData,
        userId: data.id
      });
    } 
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
              role === "candidate" ? "bg-primary text-white" : "bg-gray-200"
            } transition duration-200`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`px-4 py-2 rounded-lg flex-1 ${
              role === "recruiter" ? "bg-primary text-white" : "bg-gray-200"
            } transition duration-200`}
          >
            Recruiter
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 sm:space-y-4">
          {role === "candidate" ? (
            <ApplicantForm token={token} applicant={applicant} />
          ) : (
            <CompanyForm token={token} jobPost={jobPost} />
          )}
        </div>
      </div>
    </div>
  );
}
