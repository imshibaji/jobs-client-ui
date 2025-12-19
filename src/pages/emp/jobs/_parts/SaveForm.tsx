import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { Company, Currency, EmploymentType, Experience, Job, SalaryRange, SalaryType } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SaveForm({token, jobId, user}: {token: string, jobId?: string | number, user?: User}) {
    const {post, put, get} = useHttpClient(token);
    const [companies, setCompanies] = useState<Company[]>([]);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Job>();

    useEffect(() => {
        onInit();
    }, [jobId]);

    const onInit = async () => {
        const companiesData = await get(BASE_URL + '/companies').then((data: Response) => data.json());
        const filteredData = companiesData.filter((company: Company) => company.userId === user?.id);
        setCompanies(filteredData);

        if (jobId) {
            const jobsData = await get(BASE_URL + '/jobs/' + jobId).then((data: Response) => data.json())
            setValue('companyId', jobsData.companyId);
            setValue('title', jobsData.title);
            setValue('description', jobsData.description);
            setValue('requirements', jobsData.requirements);
            setValue('responsibilities', jobsData.responsibilities);
            setValue('skills', jobsData.skills);
            setValue('employmentType', jobsData.employmentType);
            setValue('experience', jobsData.experience);
            setValue('benefits', jobsData.benefits);
            setValue('location', jobsData.location);
            setValue('isRemote', jobsData.isRemote);
            setValue('currency', jobsData.currency);
            setValue('salary', jobsData.salary);
            setValue('salaryType', jobsData.salaryType);
            setValue('salaryRange', jobsData.salaryRange);
        }
    }

    const onSubmited = async (data: Job) => {
        if (jobId) {
            data.userId = Number(user?.id || data.userId);
            const res = await put(BASE_URL + '/jobs/' + jobId, data);
            if (res.ok) {
                alert("Job details updated successfully!");
            }
        }else{
            data.userId = Number(user?.id || data.userId);
            const res = await post(BASE_URL + '/jobs', data);
            if (res.ok) {
                alert("Job posted successfully!");
            }
        }
        window.location.href = '/emp/jobs/'+jobId;
    }

    return (
    <div>
        <div className="space-y-3">
            <form onSubmit={handleSubmit(onSubmited)} className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col col-span-2">
                        <Select {...register('companyId', {required: 'Company is required'})} error={errors.companyId} id="company" name="company" label="Select Company">
                            <option value="">Select Company</option>
                            { companies && companies.map((company) => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full flex justify-end">
                        <a href="/emp/company/add" className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-md purple-600 hover:text-gray-100 focus:ring-2 focus:outline-none focus:ring-purple-300 text-sm text-center">Create A Company</a>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex flex-col w-full col-span-2 md:col-span-1">
                        <Input {...register('title', {required: 'Title is required'})} error={errors.title} id="title" name="title" label="Job Title" />
                    </div>
                    <div className="flex flex-col w-full">
                        <Select label="Employment Type" {...register('employmentType', {required: 'Employment Type is required'})} error={errors.employmentType} id="employmentType" name="employmentType">
                            <option value="">Select Employment Type</option>
                            { Object.values(EmploymentType).map((employmentType) => (
                                <option key={employmentType} value={employmentType}>{employmentType}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-full">
                        <input {...register('isRemote')} type="checkbox" id="isRemote" name="isRemote" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 focus:border-purple-500" />
                        <label htmlFor="isRemote">Remote Work Available</label>
                    </div>
                </div>
                <TextArea {...register('description', {required: 'Description is required'})} error={errors.description} id="description" name="description" label="Job Description" rows={4} />
                <Input {...register('requirements', {required: 'Requirements is required'})} error={errors.requirements} id="requirements" name="requirements" label="Requirements" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <Input {...register('skills', {required: 'Skills is required'})} error={errors.skills} id="skills" name="skills" label="Skills" />
                    <Input {...register('responsibilities', {required: 'Responsibilities is required'})} error={errors.responsibilities} id="responsibilities" name="responsibilities" label="Responsibilities" />
                    <Select {...register('experience', {required: 'Experience is required'})} error={errors.experience} id="experience" name="experience" label="Experience">
                        <option value="">Select Experience</option>
                        { Object.values(Experience).map((experience) => (
                            <option key={experience} value={experience}>{experience}</option>
                        ))}
                    </Select>
                    <Input className="col-span-2" {...register('benefits', {required: 'Benefits is required'})} error={errors.benefits} id="benefits" name="benefits" label="Benefits" />
                    <Input {...register('location', {required: 'Location is required'})} error={errors.location} id="location" name="location" label="Job Location" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-row items-center gap-2 w-full">
                        <Select label="Currency" {...register('currency', {required: 'Currency is required'})} error={errors.currency} id="currency" name="currency">
                            <option value="">Select a currency</option>
                            { Object.values(Currency).map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </Select>
                        <Input {...register('salary', {required: 'Salary is required'})} error={errors.salary} type="text" id="salary" name="salary" label="Salary" />
                    </div>
                    <Select {...register('salaryType', {required: 'Salary Type is required'})} error={errors.salaryType} id="salaryType" name="salaryType" label="Salary Type">
                        <option value="">Select a type</option>
                        { Object.values(SalaryType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Select>
                    <Select {...register('salaryRange', {required: 'Salary Range is required'})} error={errors.salaryRange} id="salaryRange" name="salaryRange" label="Salary Range">
                        <option value="">Select a range</option>
                        { Object.values(SalaryRange).map((range) => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </Select>
                </div>
                
                <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700">Save Job</button>
            </form>
        </div>
    </div>
    );
}