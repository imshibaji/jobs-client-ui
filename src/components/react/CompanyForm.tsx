import { HttpClient } from "@/utils/httpClient";
import { Company, Job } from "@/utils/types/Company";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export default function CompanyForm({token, jobPost}: { token: string, jobPost: any}) {
    const [companyForm, setCompanyForm] = useState<Company>({} as Company);
    const [jobPostForm, setJobPostForm] = useState<Job>({} as Job);
    const httpClient = new HttpClient(token);

    useEffect(() => {
        console.log(jobPost);
        
        setCompanyForm(jobPost);
        setJobPostForm({
            title: jobPost.jobTitle,
            description: jobPost.jobDescription,
            employmentType: jobPost.jobType,
            location: jobPost.jobLocation,
            requirements: jobPost.requirements,
            responsibilities: jobPost.responsibilities,
            benefits: jobPost.benefits,
            salary: jobPost.salary
        });
    }, [jobPost]);

    const recruiterFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Register Company
        await companyRegister();
    }

     const companyRegister = async () => {
        // Search for company
        const companyData = await httpClient.get(BASE_URL + '/companies/search?key=name&value=' + companyForm.companyName);
        if (companyData.length > 0) {
            setCompanyForm(companyData[0]);
            // Update Company
            await httpClient.put(BASE_URL + '/companies/' + companyData[0].id, {
                name: companyForm.companyName,
                email: companyForm.companyEmail,
                phoneNumber: companyForm.phoneNumber,
                recruiterName: companyForm.recruiterName,
                website: companyForm.companyWebsite,
                industryType: companyForm.industryType,
                location: companyForm.companyLocation,
                userId: companyForm.userId
            });
            setJobPostForm({...jobPostForm, companyId: companyData[0].id});
            console.log(companyData);

            // Register Job
            await jobPostRegister(companyData[0]);
        }else{
            // Register Company
            const data = await httpClient.put(BASE_URL + '/companies', {
                name: companyForm.companyName,
                email: companyForm.companyEmail,
                phoneNumber: companyForm.phoneNumber,
                recruiterName: companyForm.recruiterName,
                website: companyForm.companyWebsite,
                industryType: companyForm.industryType,
                location: companyForm.companyLocation,
                userId: companyForm.userId
            });
            setCompanyForm({...companyForm, id: data.id});
            setJobPostForm({...jobPostForm, companyId: data.id});
            console.log(data);

            // Register Job
            await jobPostRegister(data);
        }
    }

    const jobPostRegister = async (companyData: any) => {
        const data = await httpClient.post(BASE_URL + '/jobs', {
            title: jobPostForm.title,
            description: jobPostForm.description,
            employmentType: jobPostForm.employmentType,
            location: jobPostForm.location,
            requirements: jobPostForm.requirements,
            responsibilities: jobPostForm.responsibilities,
            benefits: jobPostForm.benefits,
            salary: jobPostForm.salary,
            companyId: companyData.id,
            userId: companyForm.userId
        });
        console.log(data);

        // Success
        alert('Job Requirement posted successfully!');

        // Remove Local Storage
        localStorage.removeItem('jobPost');
        localStorage.removeItem('userToken');

        // Success
        alert('Welcome to the team!');
        window.location.href = '/emp';
    }

    return (<div>
        <form onSubmit={recruiterFormSubmit} className="space-y-3 sm:space-y-4">
            <input value={companyForm.companyName} onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })} type="text" placeholder="Company Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.companyEmail} onChange={(e) => setCompanyForm({ ...companyForm, companyEmail: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.phoneNumber} onChange={(e) => setCompanyForm({ ...companyForm, phoneNumber: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.recruiterName} onChange={(e) => setCompanyForm({ ...companyForm, recruiterName: e.target.value })} type="text" placeholder="Recruiter Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.companyWebsite} onChange={(e) => setCompanyForm({ ...companyForm, companyWebsite: e.target.value })} type="text" placeholder="Company Website" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={companyForm.industryType} onChange={(e) => setCompanyForm({ ...companyForm, industryType: e.target.value })} type="text" placeholder="Industry Type" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={companyForm.companyLocation} onChange={(e) => setCompanyForm({ ...companyForm, companyLocation: e.target.value })} type="text" placeholder="Office Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                Register as Recruiter
            </button>
        </form>
    </div>);
}