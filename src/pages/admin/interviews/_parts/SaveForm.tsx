import Input from "@/components/ReactForm/Input";
import Select from "@/components/ReactForm/Select";
import TextArea from "@/components/ReactForm/TextArea";
import { Applicant } from "@/utils/types/Applicant";
import { Application, getApplicant, Interview, InterviewStatus } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useRef, useState } from "react";

export default function SaveForm({token, interviewId}: {token: string, interviewId?: string}) {
    const [interview, setInterview] = useState<Interview>({
        applicationId: '',
        userId: '',
        notes: '',
        feedback: '',
        date: '',
        time: '',
        location: '',
        status: InterviewStatus.SCHEDULED
    });
    const [users, setUsers] = useState<User[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const {post, put, get} = useHttpClient(token);

    useEffect(() => {
        onInit();
    }, [interviewId]);

    const onInit = async () => {
        const applicationsData = await get(BASE_URL + '/applications').then(res => res.json()) as Application[];
        const applicantsData = await get(BASE_URL + '/applicants').then(res => res.json()) as Applicant[];
        const combinedData = applicationsData.map((application: Application) => {
            return {
                ...application,
                applicant: getApplicant(applicantsData, application.applicantId!)
            }
        });
        setApplications(combinedData);
        const usersData = await get(BASE_URL + '/users').then(res => res.json()).then(res => res.filter((user: User) => user.role !== "user")) as User[];
        setUsers(usersData);
        if(interviewId) {
            const data = await get(BASE_URL + `/interviews/${interviewId}`).then(res => res.json()) as Interview;
            console.log(data);
            data.status = data.status as InterviewStatus;
            setInterview(data);
        }

    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(interview);
        
        if(interviewId) {
            await put(BASE_URL + '/interviews/' + interviewId, interview);
            alert('Interview updated successfully!');
            window.location.href = '/admin/interviews';
        }else{
            await post(BASE_URL + '/interviews', interview);            
            alert('Interview created successfully!');
            window.location.href = '/admin/interviews';
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Select value={interview?.applicationId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInterview({...interview, applicationId: e.target.value})} name="applicationId" required title="Application ID" label="Application for Job">
                    <option value="">Select Application</option>
                    {
                        applications && applications.map((application) => <option key={application.id} value={application.id}>{application.coverLetter} - {application.applicant?.name}</option>)
                    }
                </Select>
                <Select value={interview?.userId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInterview({...interview, userId: e.target.value})} name="userId" required title="Recruiter ID" label="Interviewer">
                    <option value="">Select Recruiter</option>
                    {
                        users && users.map((user: User) => <option key={user.id} value={user.id}>{user.name}</option>)
                    }
                </Select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextArea defaultValue={interview?.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInterview({...interview, notes: e.target.value})} name="notes" rows="4" title="Notes" label="Interview Notes" placeholder="eg. Interview notes"  />
                <TextArea defaultValue={interview?.feedback} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInterview({...interview, feedback: e.target.value})} name="feedback" rows="4" title="Feedback" label="Interview Feedback" placeholder="eg. Interview feedback" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Input defaultValue={interview?.location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterview({...interview, location: e.target.value})} name="location" label="Interviewer Location" placeholder="eg. Online / In Person in Bangalore" />
                <Input defaultValue={interview?.date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterview({...interview, date: e.target.value})} name="date" label="Interview Date" type="date" />
                <Input defaultValue={interview?.time} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterview({...interview, time: e.target.value})} name="time" label="Interview Time" type="time" />
                <Select defaultValue={interview?.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInterview({...interview, status: e.target.value})} name="status" title="Status" label="Interview Status">
                    <option value="">Select Status</option>
                    {Object.keys(InterviewStatus).map((key, index) => <option key={index} value={InterviewStatus[key as keyof typeof InterviewStatus]}>{key}</option>)}
                </Select>
            </div>
            <button type="submit" className="btn btn-primary px-6">Save Interview</button>
        </form>
    );
}