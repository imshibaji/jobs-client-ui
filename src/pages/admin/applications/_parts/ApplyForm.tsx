import { Applicant } from "@/utils/types/Applicant";
import { Application, ApplicationStatus, Job } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";
import ResumeUploader from "./FileUploader";

export default function ApplyForm({token, id}: {token: string, id?: number | string}) {
    const {post, put, get} = useHttpClient(token);
    const [application, setApplication] = useState<Application>({
        coverLetter: '',
        details: '',
        resume: '',
        status: ApplicationStatus.PENDING,
    });
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [managers, setManagers] = useState<User[]>([]);

    useEffect(() => {
        onInit();
    }, [id]);


    const onInit = () => {
        if (id) {
            get(`${BASE_URL}/applications/${id}`)
            .then((data: Response) => {
                return data.ok && data.json();
            })
            .then((data: Application) => {
                setApplication(data);
            }).catch((err: Error) => {
                console.log(err);
            });
        }
        get(BASE_URL + '/applicants')
        .then((data: Response) => {
            return data.json();
        })
        .then((data: Applicant[]) => {
            setApplicants(data);
        }).catch((err: Error) => {
            console.log(err);
        });
        get(BASE_URL + '/jobs')
        .then((data: Response) => {
            return data.json();
        })
        .then((data: Job[]) => {
            setJobs(data);
        }).catch((err: Error) => {
            console.log(err);
        });
        get(BASE_URL + '/users')
        .then((data: Response) => {
            return data.json();
        }).then((data: User[]) => {
            const filteredData = data.filter((user: User) => user.role !== 'user');
            return filteredData;
        })
        .then((data: User[]) => {
            setManagers(data);
        }).catch((err: Error) => {
            console.log(err);
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            put(`${BASE_URL}/applications/${id}`, application)
            .then((data: Response) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                window.location.href = '/admin/applications/'+id;
            });
        }else{
            post(`${BASE_URL}/applications`, application)
            .then((data: Response) => {
                return data.json();
            })
            .then((data: Application) => {
                console.log(data);
                window.location.href = '/admin/applications/'+data.id;
            });
        }
        
    }

    return (
        <div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-8 border-violet-600">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-violet-700 text-3xl font-extrabold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            { id? 'Update Application': 'Create Application' }
                        </h1>
                        <p className="text-gray-500 mt-1">Fill in the comprehensive form below to log a new job application.</p>
                    </div>
                    <a href="/admin/applications" className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition duration-200 shadow-md">
                        &larr; Back to Applications
                    </a>
                </div>
                
                <hr className="border-gray-200 my-6" />
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="applicantId" className="block text-gray-700 font-bold mb-2">Applicant:</label>
                            <select value={application.applicantId} onChange={(e) => setApplication({...application, applicantId: parseInt(e.target.value)})} id="applicantId" name="applicantId" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required>
                                <option selected>Select Applicant</option>
                                {applicants.map((applicant) => (
                                    <option key={applicant.id} value={applicant.id}>
                                       {applicant.name} - {applicant.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-2">
                            <label htmlFor="jobId" className="block text-gray-700 font-bold mb-2">Job:</label>
                            <select value={application.jobId} onChange={(e) => setApplication({...application, jobId: parseInt(e.target.value)})} id="jobId" name="jobId" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required>
                                <option selected>Select Job</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="user" className="block text-gray-700 font-bold mb-2">Manager:</label>
                            <select value={application.userId || ''} onChange={(e) => setApplication({...application, userId: parseInt(e.target.value)})} id="user" name="user" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required>
                                <option selected>Select Manager</option>
                                {managers.map((manager) => (
                                    <option key={manager.id} value={manager.id}>
                                        {manager.name} - {manager.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="coverLetter" className="block text-gray-700 font-bold mb-2">Application Cover Letter:</label>
                        <input value={application.coverLetter} onChange={(e) => setApplication({...application, coverLetter: e.target.value})} type="text" placeholder="eg: I am good in..." id="coverLetter" name="coverLetter" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Application Details:</label>
                        <textarea value={application.details} onChange={(e) => setApplication({...application, details: e.target.value})} rows={4} placeholder="eg: I am good in..." id="details" name="details" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Application Status:</label>
                            <select value={application.status} onChange={(e) => setApplication({...application, status: e.target.value as ApplicationStatus})} id="status" name="status" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm" required>
                                {
                                    Object.values(ApplicationStatus).map((status, key) => (
                                        <option key={key} value={status}>{status}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">Upload Applicant Resume (.pdf, .docx)</label>
                            <ResumeUploader fileName={application.resume} token={token} onSubmitSuccess={(data) => setApplication({...application, resume: data.filename})}/>
                            {application.resume && <span className="text-gray-400 text-xs">(optional): {application.resume}</span>}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary w-full py-4">Save Application</button>
                    </div>
                </form>
            </div>
        </div>
    )
}