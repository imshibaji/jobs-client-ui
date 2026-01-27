import { HttpClient } from "@/utils/HttpClient";
import { Company, Job } from "@/utils/types/Company";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export default function CompanyForm({token, jobPost}: { token: string, jobPost: any}) {
    const [companyForm, setCompanyForm] = useState<Company>({} as Company);
    const [jobPostForm, setJobPostForm] = useState<Job>({} as Job);
    const httpClient = new HttpClient(token);

    useEffect(() => {
        console.log(jobPost);
        
        setCompanyForm({
            ...companyForm,
            name: jobPost.companyName,
            email: jobPost.companyEmail,
            phoneNumber: jobPost.phoneNumber,
            userId: jobPost.userId
        });
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
        if(!companyForm) return;
        // Register Company
        const data = await httpClient.post(BASE_URL + '/companies', {
            name: companyForm.name,
            email: companyForm.email,
            phoneNumber: companyForm.phoneNumber,
            recruiterName: companyForm.recruiterName,
            website: companyForm.website,
            industryType: companyForm.industryType,
            address: companyForm.address,
            city: companyForm.city,
            state: companyForm.state,
            country: companyForm.country,
            zipCode: companyForm.zipCode,
            userId: companyForm.userId
        });
        setCompanyForm({...companyForm, id: data.id});
        setJobPostForm({...jobPostForm, companyId: data.id});
        console.log(data);

        // Register Job
        await jobPostRegister(data);

        // Update User
        await userUpdate();
    }

    const jobPostRegister = async (companyData: any) => {
        if(!jobPostForm) return;
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

    const userUpdate = async () => {
        // Update User
        await httpClient.put(BASE_URL + '/auth/change-role', {
            newRole: 'employer'
        });
        alert('Your account has been updated! Please login again.');
        localStorage.removeItem('userToken');
        window.location.href = '/logout';
    }

    return (<div>
        <form onSubmit={recruiterFormSubmit} className="space-y-3 sm:space-y-4">
            <input value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} type="text" placeholder="Company Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.phoneNumber} onChange={(e) => setCompanyForm({ ...companyForm, phoneNumber: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.recruiterName} onChange={(e) => setCompanyForm({ ...companyForm, recruiterName: e.target.value })} type="text" placeholder="Recruiter Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={companyForm.website} onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })} type="text" placeholder="Company Website" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={companyForm.industryType} onChange={(e) => setCompanyForm({ ...companyForm, industryType: e.target.value })} type="text" placeholder="Industry Type" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} type="text" placeholder="Office Address" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <div className="flex space-x-4">
                <input value={companyForm.state} onChange={(e) => setCompanyForm({ ...companyForm, state: e.target.value })} type="text" placeholder="State" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input value={companyForm.country} onChange={(e) => setCompanyForm({ ...companyForm, country: e.target.value })} type="text" placeholder="Country" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <input value={companyForm.zipCode} onChange={(e) => setCompanyForm({ ...companyForm, zipCode: e.target.value })} type="text" placeholder="Zip Code" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-violet-800 transition duration-200">
                Register as Recruiter
            </button>
        </form>
    </div>);
}