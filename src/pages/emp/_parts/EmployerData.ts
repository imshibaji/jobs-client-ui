import { getDataFromServer } from "@/utils/getDataRequest";
import { Applicant } from "@/utils/types/Applicant";
import { Application, Company, Interview, Job, Offer } from "@/utils/types/Company";
import { Feedback } from "@/utils/types/Feedback";
import { User } from "@/utils/types/User";

export async function getEmployerData(token: string, user?: User) {
    const companiesData = await getDataFromServer(token, 'companies', user?.id) as Company[];
    const jobsData = await getDataFromServer(token, 'jobs') as Job[];
    const applicationsData = await getDataFromServer(token, 'applications') as Application[];
    const applicantsData = await getDataFromServer(token, 'applicants') as Applicant[];
    const offerData = await getDataFromServer(token, 'offers') as Offer[];
    const interviewData = await getDataFromServer(token, 'interviews') as Interview[];

    const filteredJobs = companiesData && jobsData && jobsData.filter((job: Job) => (
        companiesData.some((company: Company) => company.id === job.companyId)
    )) as Job[];

    const filteredApplications = applicationsData && applicationsData.filter((application: Application) => {
        return filteredJobs.some((job: Job) => job.id === application.jobId);
    });

    const combinedApplicationsData = filteredApplications.map((application: Application) => {
        const applicant = applicantsData.find((applicant: Applicant) => applicant.id === application.applicantId);
        const job = jobsData.find((job: Job) => job.id === application.jobId);
        const company = companiesData.find((company: Company) => company.id === job?.companyId);
        return {
            ...application,
            applicant: applicant,
            job: job,
            company: company,
            user: user,
        };
    });

    const filteredOffers = offerData && offerData.filter((offer: Offer) => {
        return filteredApplications.some((application: Application) => application.id === offer.applicationId);
    });


    let filteredInterviews = interviewData && interviewData.filter((interview: Interview) => {
        return filteredApplications.some((application: Application) => application.id === interview.applicationId);
    });
    filteredInterviews = filteredInterviews && filteredInterviews.map((interview: Interview) => {
        const application = applicationsData.find((app: Application) => app.id === interview.applicationId);
        const applicant = applicantsData.find((applicant: Applicant) => applicant.id === application?.applicantId);
        const job = jobsData.find((job: Job) => job.id === application?.jobId);
        const company = companiesData.find((company: Company) => company.id === job?.companyId);
        return {
            ...interview,
            application: application,
            applicant: applicant,
            job: job,
            company: company,
        };
    });

    // Filter the jobs based on the filteredCompanies
    // console.log(companiesData);
    // Filter the applications based on the filteredJobs
    // console.log(filteredJobs);
    // Filter the applications based on the filteredJobs
    // console.log(filteredApplications);
    
    return {
        companies: companiesData,
        jobs: filteredJobs,
        applications: combinedApplicationsData,
        applicants: applicantsData,
        offers: filteredOffers,
        interviews: filteredInterviews
    };
}

export async function getFeedbacksData(token: string, user?: User, tableName?: string, tableId?: number | string) {
    const feedbackData = await getDataFromServer(token, 'feedbacks') as Feedback[];

    const filteredFeedback = feedbackData && feedbackData.filter((feedback: Feedback) => (
        feedback.userId === user?.id, feedback.tableName === tableName, feedback.tableId === tableId
    )) as Feedback[];

    return {
        feedbacks: filteredFeedback
    };
}