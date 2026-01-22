import Input from "@/components/ReactForm/Input";
import Select from "@/components/ReactForm/Select";
import TextArea from "@/components/ReactForm/TextArea";
import { Applicant } from "@/utils/types/Applicant";
import { Application, Job, Offer, OfferStatus, OfferType } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";


export default function SaveForm({ token, offerId }: { token: string, offerId?: string }) {
    const { get, post, put } = useHttpClient(token);
    const [users, setUsers] = useState<User[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [form, setForm] = useState<Offer>({
        id: 0,
        userId: 0,
        jobId: 0,
        applicationId: 0,
        applicantId: 0,
        message: '',
        date: '',
        status: OfferStatus.PENDING,
        type: OfferType.FULL_TIME,
        attachment: ''
    });

    useEffect(() => {
        onInit();
    }, [offerId]);

    const onInit = async () => {
        const recruitersData = await get(BASE_URL + '/users').then(res => res.json()).then(res => res.filter((user: User) => user.role !== "user")) as User[];
        const jobsData = await get(BASE_URL + '/jobs').then(res => res.json()) as Job[];
        const applicationsData = await get(BASE_URL + '/applications').then(res => res.json()) as Application[];
        const applicantsData = await get(BASE_URL + '/applicants').then(res => res.json()) as Applicant[];
        setUsers(recruitersData);
        setJobs(jobsData);
        setApplications(applicationsData);
        setApplicants(applicantsData);
        if (offerId) {
            const data = await get(BASE_URL + `/offers/${offerId}`).then(res => res.json()) as Offer;
            console.log(data);
            data.status = data.status as OfferStatus;
            data.type = data.type as OfferType;
            setForm(data);
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (offerId) {
            await put(BASE_URL + `/offers/${offerId}`, form);
            alert('Offer updated successfully!');
            window.location.href = '/admin/offers';
        } else {
            await post(BASE_URL + '/offers', form);
            alert('Offer created successfully!');
            window.location.href = '/admin/offers';
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="grid md:grid-cols-4 gap-2">
                    <Select value={form.userId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, userId: e.target.value })} label="Recruiter" id="userId" name="useId" required>
                        <option value="">Select Recruiter</option>
                        {
                            users.map((user: User) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))
                        }
                    </Select>
                    <Select value={form.jobId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, jobId: Number(e.target.value) })} label="Job Name" id="jobId" name="jobId" required>
                        <option value="">Select Job</option>
                        {
                            jobs.map((job: Job) => (
                                <option key={job.id} value={job.id}>{job.title}</option>
                            ))
                        }
                    </Select>
                    <Select value={form.applicationId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, applicationId: Number(e.target.value) })} label="Candidate Name" id="applicantId" name="applicantId" required>
                        <option value="">Select Application</option>
                        {
                            applications.map((application: Application) => (
                                <option key={application.id} value={application.id}>{application.coverLetter}</option>
                            ))
                        }
                    </Select>
                    <Select value={form.applicantId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, applicantId: Number(e.target.value) })} label="Candidate Name" id="applicantId" name="applicantId" required>
                        <option value="">Select Candidate</option>
                        {
                            applicants.map((applicant: Applicant) => (
                                <option key={applicant.id} value={applicant.id}>{applicant.name}</option>
                            ))
                        }
                    </Select>
                </div>
                <TextArea value={form.message} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, message: e.target.value })} label="Job Offer Message" placeholder="Job Offer Message" id="message" name="message" />
                <div className="grid md:grid-cols-4 gap-2">
                    <Input value={form.date} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, date: e.target.value })} type="date" label="Joining Date" placeholder="Joining Date" id="date" name="date" />
                    <Select value={form.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, status: e.target.value as OfferStatus })} label="Offer Status" id="status" name="status">
                        <option value="">Select Status</option>
                        {
                            Object.keys(OfferStatus).map((key, index) => (
                                <option key={index} value={key}>{OfferStatus[key as keyof typeof OfferStatus]}</option>
                            ))
                        }
                    </Select>
                    <Select value={form.type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, type: e.target.value as OfferType })} label="Offer Type" id="type" name="type">
                        <option value="">Select Type</option>
                        {
                            Object.keys(OfferType).map((key, index) => (
                                <option key={index} value={key}>{OfferType[key as keyof typeof OfferType]}</option>
                            ))
                        }
                    </Select>
                    <Input type="file" label="Offer Attachment" id="attachment" name="attachment" />
                </div>
                <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">Save Offer</button>
            </form>
        </div>
    )
}