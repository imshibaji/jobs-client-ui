import { Applicant } from "@/utils/types/Applicant";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export default function ApplicantForm({token, applicant}: {token: string, applicant: Applicant}) {
    const [applicantForm, setApplicantForm] = useState<Applicant>({} as Applicant);
    const {post, upload} = useHttpClient(token);

    useEffect(() => {        
        setApplicantForm(applicant);
    }, [applicant]);

    const applicantFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', applicantForm.name);
        formData.append('email', applicantForm.email);
        formData.append('phoneNumber', applicantForm.phoneNumber);
        formData.append('skills', applicantForm.skills);
        formData.append('experience', applicantForm.experience);
        formData.append('location', applicantForm.location);
        formData.append('userId', applicantForm.userId?.toString() ?? '');

        if(applicantForm.resume) {
            const response = await fileUpload(applicantForm.resume as File, applicantForm) as any;
            formData.append('resume', response.filename);
        }
        const response = await post(BASE_URL+'/applicants', {
            name: formData.get('name'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            skills: formData.get('skills'),
            experience: formData.get('experience'),
            location: formData.get('location'),
            userId: formData.get('userId'),
            resume: formData.get('resume'),
        });
        console.log(response);

        if(!response.ok) {
            alert('Applicant form submission failed!');
            return;
        }
        alert('Applicant form submitted successfully!');
        window.location.href = '/user';
    }

    const fileUpload = async (file: File, applicantForm: Applicant) => {
        const formData = new FormData();
        formData.append('customName', 'applicant-cv-'+applicantForm.userId);
        formData.append('folder', 'resumes');
        formData.append('file', file);
        const response = await upload(BASE_URL+'/upload', formData);
        if(!response.ok) {
            alert('File upload failed!');
        }
        return await response.json();
    }

    return (
    <div>
        <form onSubmit={applicantFormSubmit} className="space-y-3 sm:space-y-4">
            <input value={applicantForm.name} onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })} type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={applicantForm.email} onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={applicantForm.phoneNumber} onChange={(e) => setApplicantForm({ ...applicantForm, phoneNumber: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={applicantForm.skills} onChange={(e) => setApplicantForm({ ...applicantForm, skills: e.target.value })} type="text" placeholder="Skills" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={applicantForm.experience} onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })} type="text" placeholder="Experience (Years)" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input value={applicantForm.location} onChange={(e) => setApplicantForm({ ...applicantForm, location: e.target.value })} type="text" placeholder="Preferred Job Location" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <input onChange={(e) => setApplicantForm({ ...applicantForm, resume: e.target.files?.[0] ?? null })} type="file" accept=".pdf,.docx" className="w-full text-sm border bg-gray-200 border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 font-semibold" />
            <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                Register as Candidate
            </button>
        </form>
    </div>
    );
}