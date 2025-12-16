import { Company, Currency, EmploymentType, Experience, Job, SalaryRange, SalaryType } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export default function SaveForm({token, jobId}: {token: string, jobId?: string | number}) {
    const {post, put, get} = useHttpClient(token);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<Job>({
        title: '',
        description: '',
        experience: Experience.NO_EXPERIENCE,
        employmentType: EmploymentType.FULL_TIME,
        requirements: '',
        responsibilities: '',
        benefits: '',
        skills: '',
        location: '',
        salary: '',
        currency: Currency.INR,
        salaryType: SalaryType.MONTHLY,
        salaryRange: SalaryRange.LESS_THAN_10K,
        isRemote: false,
        companyId: 1,
        userId: 1
    });

    useEffect(() => {
        onInit();
    }, [jobId]);

    const onInit = () => {
        if (jobId) {
            get(BASE_URL + '/jobs/' + jobId)
            .then((data: Response) => {
                return data.json();
            })
            .then((data: Job) => {
                setForm(data);
            }).catch((err: Error) => {
                console.log(err);
            });
        }
        get(BASE_URL + '/companies')
        .then((data: Response) => {
            return data.json();
        })
        .then((data: Company[]) => {
            // console.log(data);
            setCompanies(data);
        }).catch((err: Error) => {
            console.log(err);
        });
        get(BASE_URL + '/users')
        .then((data: Response) => {
            return data.json();
        })
        .then((data: User[]) => {
            const filteredData = data.filter((user: User) => user.role !== 'user');
            setUsers(filteredData);
        }).catch((err: Error) => {
            console.log(err);
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (jobId) {
            put(BASE_URL + '/jobs/' + jobId, form).then((data) => {
                console.log(data);
            });
        }else{
            post(BASE_URL + '/jobs', form).then((data) => {
                console.log(data);
            });
        }
        window.location.href = '/admin/jobs/'+jobId;
    }

    return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 mt-4">
        <div className="flex justify-between items-center mb-4">
            {
                jobId ? 
                    <h2 className="text-3xl font-semibold text-purple-700">Update Job</h2> 
                : <h2 className="text-3xl font-semibold text-purple-700">Create A Job</h2>
            }
            <a href="/admin/jobs" className="text-purple-600 focus:ring-2 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-1.5 text-center border border-purple-600 hover:bg-purple-600 hover:text-white">Back To Jobs</a>
        </div>
        <hr className="border-gray-300 my-8" />
        <div className="space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col col-span-2 md:col-span-1">
                        <label htmlFor="manager">Select A Manager</label>
                        <select value={form.userId} onChange={(e) => setForm({...form, userId: Number(e.target.value)})} id="manager" name="userId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
                            <option selected>Select A Manager</option>
                            { users && users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="company">Choose A Company</label>
                        <select value={form.companyId} onChange={(e) => setForm({...form, companyId: Number(e.target.value)})}id="company" name="companyId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
                            <option selected>Choose A Company</option>
                            { companies && companies.map((company) => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex justify-end">
                        <a href="/admin/companies/create" className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-md purple-600 hover:text-gray-100 focus:ring-2 focus:outline-none focus:ring-purple-300 text-sm text-center">Create A Company</a>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex flex-col w-full col-span-2 md:col-span-1">
                        <label htmlFor="title">Job Title</label>
                        <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} type="text" placeholder="Job Title" id="title" name="title" className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="title">Employment Type</label>
                        <select value={form.employmentType} onChange={(e) => setForm({...form, employmentType: e.target.value})} id="title" name="employmentType" className="w-full bg-gray-50 rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500">
                            <option selected>Employment Type</option>
                            { Object.values(EmploymentType).map((employmentType) => (
                                <option key={employmentType} value={employmentType}>{employmentType}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-full">
                        <input checked={form.isRemote} onChange={(e) => setForm({...form, isRemote: e.target.checked})} type="checkbox" id="isRemote" name="isRemote" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 focus:border-purple-500" />
                        <label htmlFor="isRemote">Remote Work Available</label>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Job Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={5} placeholder="Job Description" id="description" name="description" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="requirements">Requirements</label>
                    <input value={form.requirements} onChange={(e) => setForm({...form, requirements: e.target.value})} type="text" placeholder="Requirements" id="requirements" name="requirements" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col">
                        <label htmlFor="skills">Skills</label>
                        <input value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} type="text" placeholder="Skills" id="skills" name="skills" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="education">Responsibilities</label>
                        <input value={form.responsibilities} onChange={(e) => setForm({...form, responsibilities: e.target.value})} type="text" placeholder="Responsibilities" id="responsibilities" name="responsibilities" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="experience">Experience</label>
                        <select value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} id="experience" name="experience" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500">
                            <option selected>Select Experience</option>
                            { Object.values(Experience).map((experience) => (
                                <option key={experience} value={experience}>{experience}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="benefits">Benefits</label>
                        <input value={form.benefits} onChange={(e) => setForm({...form, benefits: e.target.value})} type="text" placeholder="Benefits" id="benefits" name="benefits" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="location">Job Location</label>
                        <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} type="text" placeholder="Location" id="location" name="location" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-row items-center gap-2 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="currency">Currency</label>
                            <select value={form.currency} onChange={(e) => setForm({...form, currency: e.target.value})} id="currency" name="currency" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500">
                                <option selected>Select Currency</option>
                                { Object.values(Currency).map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="salary">Salary</label>
                            <input value={form.salary} onChange={(e) => setForm({...form, salary: e.target.value})} type="text" placeholder="Salary" id="salary" name="salary" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="type">Salary Type</label>
                        <select value={form.salaryType} onChange={(e) => setForm({...form, salaryType: e.target.value})} id="type" name="type" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500">
                            <option selected>Select Salary Type</option>
                            { Object.values(SalaryType).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="link">Salary Range</label>
                        <select value={form.salaryRange} onChange={(e) => setForm({...form, salaryRange: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
                            <option selected>Select Salary Range</option>
                            { Object.values(SalaryRange).map((range) => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <button type="submit" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700">Save Job</button>
            </form>
        </div>
    </div>
    );
}