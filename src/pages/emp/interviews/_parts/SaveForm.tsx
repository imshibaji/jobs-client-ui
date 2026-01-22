import Input from "@/components/ReactForm/Input";
import Select from "@/components/ReactForm/Select";
import TextArea from "@/components/ReactForm/TextArea";
import { Application, Interview, InterviewStatus } from "@/utils/types/Company";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getEmployerData } from "@/pages/emp/_parts/EmployerData";
import { BASE_URL } from "astro:env/client";

export default function SaveForm({token, interviewId, user, applicationId}: {token: string, interviewId?: string | number, user?: User, applicationId?: string | number}) {
    const {post, put, get} = useHttpClient(token);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Interview>();
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        onInit();
    }, [interviewId]);

    const onInit = async () => {
        const {applications} = await getEmployerData(token, user);
        setApplications(applications);
        
        if(applicationId) setValue('applicationId', applicationId);
        setValue('userId', user?.id!);

        if (interviewId) {
            const interviewData = await get(BASE_URL + '/interviews/' + interviewId).then((data: Response) => data.json())
            setValue('applicationId', interviewData.applicationId);
            setValue('notes', interviewData.notes);
            setValue('feedback', interviewData.feedback);
            setValue('location', interviewData.location);
            setValue('date', interviewData.date);
            setValue('time', interviewData.time);
            setValue('status', interviewData.status);
            setValue('userId', interviewData.userId);
        }
    }

    const onSubmited = async (data: Interview) => {
        if (interviewId) {
            const res = await put(BASE_URL + '/interviews/' + interviewId, data);
            if (res.ok) {
                alert("Interview details updated successfully!");
            }
        }else{
            const res = await post(BASE_URL + '/interviews', data);
            if (res.ok) {
                alert("Interview scheduled successfully!");
            }
        }
        window.location.href = '/emp/interviews';
    }

    return (
    <div>
        <div className="space-y-3">
            <form onSubmit={handleSubmit(onSubmited)} className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <Select {...register('status', {required: 'Status is required'})} error={errors.status} id="status" name="status" label="Interview Status">
                        <option value="">Select Status</option>
                        {Object.entries(InterviewStatus).map(([key, status]) => (
                            <option key={key} value={status}>{status}</option>
                        ))}
                    </Select>
                    <Input {...register('date', {required: 'Date is required'})} error={errors.date} id="date" name="date" label="Interview Date" type="date" />
                    <Input {...register('time', {required: 'Time is required'})} error={errors.time} id="time" name="time" label="Interview Time" type="time" />
                    <Input {...register('location', {required: 'Location is required'})} error={errors.location} id="location" name="location" label="Interview Location" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextArea {...register('notes')} error={errors.notes} id="notes" name="notes" label="Interview Notes" rows={4} />
                    <TextArea {...register('feedback')} error={errors.feedback} id="feedback" name="feedback" label="Interview Feedback" rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select {...register('applicationId', {required: 'Application is required'})} error={errors.applicationId} value={applicationId || ''} id="applicationId" name="applicationId" label="Select Application">
                        <option value="">Select Application</option>
                        { applications && applications.map((application : any) => (
                            <option key={application.id} value={application.id}>#{application.id} - {application.coverLetter} - {application.applicant?.name}</option>
                        ))}
                    </Select>
                    <Input id="userId" name="userId" label="Interviewer ID" type="text" value={user?.name} readOnly />
                </div>
                
                <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700">Save Interview</button>
            </form>
        </div>
    </div>
    );
}