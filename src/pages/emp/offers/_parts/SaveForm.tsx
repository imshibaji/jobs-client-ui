import Input from "@/components/ReactForm/Input";
import Select from "@/components/ReactForm/Select";
import TextArea from "@/components/ReactForm/TextArea";
import { useHttpClient } from "@/utils/useHttpClient";
import { getEmployerData } from "../../_parts/EmployerData";
import { useForm } from "react-hook-form";
import { Application, Job, Offer, OfferStatus, OfferType } from "@/utils/types/Company";
import { useEffect, useState } from "react";
import { Applicant } from "@/utils/types/Applicant";
import { BASE_URL } from "astro:env/client";
import { User } from "@/utils/types/User";
import { fileDownloadLink, fileUpload } from "@/utils/fileHandler";

export default function SaveForm({token, user, offerId}: {token:string, user?: User, offerId?: number | string}){
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const {post, put, get} = useHttpClient(token);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Offer>();
    const offerData = watch();

    useEffect(() => {
        console.log(offerData);
        
        onInit();
    }, [offerId]);

    const onInit = async () =>{
        const {jobs, applications, applicants} = await getEmployerData(token);
        setJobs(jobs);
        setApplications(applications);
        setApplicants(applicants);
        
        if (offerId) {
            const offerData = await get(BASE_URL + '/offers/' + offerId).then((data: Response) => data.json())
            setValue('jobId', offerData.jobId);
            setValue('applicationId', offerData.applicationId);
            setValue('applicantId', offerData.applicantId);
            setValue('message', offerData.message);
            setValue('date', offerData.date);
            setValue('status', offerData.status);
            setValue('type', offerData.type);
            setValue('attachment', offerData.attachment);
            setValue('userId', offerData.userId);
        }
    }

    const onSubmited = async (data: Offer) => {
        if(data.attachment as File) {
            const fileName = await fileUpload(token, data.attachment, 'offers');
            data.attachment = fileName as string;
        }
        if (offerId) {
            await put(BASE_URL + '/offers/' + offerId, data);
        } else {
            await post(BASE_URL + '/offers', data);
        }
        window.location.href = '/emp/offers';
    }

    return (
        <form onSubmit={handleSubmit(onSubmited)} className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 mb-3">
                <Select {...register('jobId', { required: "Job is required" })} error={errors.jobId} label="Choose Job" name="jobId">
                    <option value="0">Select Job</option>
                    { jobs && jobs.map((job: Job) => (
                        <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                </Select>
                <Select {...register('applicationId', { required: "Application is required" })} error={errors.applicationId} label="Choose Application" name="applicationId">
                    <option value="">Select Application</option>
                    { applications && applications.map((application: Application) => (
                        <option key={application.id} value={application.id}>{application.coverLetter}</option>
                    ))}
                </Select>
                <Select {...register('applicantId', { required: "Applicant is required" })} error={errors.applicantId} label="Choose Applicant" name="applicantId">
                    <option value="">Select Applicant</option>
                    { applicants && applicants.map((applicant: Applicant) => (
                        <option key={applicant.id} value={applicant.id}>{applicant.name}</option>
                    ))}
                </Select>
            </div>
            <TextArea {...register('message', { required: "Message is required" })} error={errors.message} className="mb-3" rows={5} label="Message" name="message" />
            <div className="grid grid-cols-2 gap-4 mb-3">
                <Input {...register('date', { required: "Date is required" })} error={errors.date} label="Joining Date" type="date" name="date" />
                <Select {...register('status', { required: "Status is required" })} error={errors.status} label="Offer Status" name="status">
                    <option value="">Select Status</option>
                    {
                        Object.keys(OfferStatus).map((status: string) => (
                            <option key={status} value={status}>{status}</option>
                        ))
                    }
                </Select>
                <Select {...register('type', { required: true })} error={errors.type} label="Job Type" name="type">
                    <option value="">Select Type</option>
                    {
                        Object.entries(OfferType).map(([type, value]) => (
                            <option key={type} value={type}>{value}</option>
                        ))
                    }
                </Select>
                <div>
                    <Input {...register('attachment')} accept={"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"} error={errors.attachment} label="Attachment" type="file" name="attachment" />
                    <p className="text-xs text-gray-500">{(offerData.attachment != null && typeof offerData.attachment === 'string' )? <span>File Name: <a href={fileDownloadLink('offers', offerData.attachment)} target="_blank">{offerData.attachment || 'No File'}</a></span> : "Only DOC / PDF files are allowed"}</p>
                </div>
                
            </div>
            <div className="flex flex-col">
                <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600">Save and Offer</button>
            </div>
        </form>
    );
}