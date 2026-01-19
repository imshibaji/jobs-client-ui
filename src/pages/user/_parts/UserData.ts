import { getDataFromServer } from "@/utils/getDataRequest";
import { Applicant, Education, Experience, Skill } from "@/utils/types/Applicant";
import { Application, Interview, Job, Offer } from "@/utils/types/Company";
import { User } from "@/utils/types/User";

export async function getUserData(token: string, user?: User) {
    const applicantData = (await getDataFromServer(token, 'applicants', user?.id))[0] as Applicant;
    const skillsData = await getDataFromServer(token, 'skills') as Skill[];
    const filteredSkills = skillsData && skillsData.filter((skill: Skill) => {
        return applicantData && skill.applicantId === applicantData.id
    });
    const experiencesData = await getDataFromServer(token, 'experiences') as Experience[];
    const filteredExperiences = experiencesData && experiencesData.filter((experience: Experience) => {
        return applicantData && experience.applicantId === applicantData.id
    });
    const educationsData = await getDataFromServer(token, 'education') as Education[];
    const filteredEducations = educationsData && educationsData.filter((education: Education) => {
        return applicantData && education.applicantId === applicantData.id
    });
    const applicationsData = await getDataFromServer(token, 'applications', user?.id) as Application[];
    const filteredApplications = applicationsData && applicationsData.filter((application: Application) => {
        return applicantData && application.applicantId === applicantData.id;
    })
    const jobsData = await getDataFromServer(token, 'jobs') as Job[];
    const matchedJobs = jobsData && jobsData.filter((job: Job) => {
        return filteredSkills.some((skill: Skill) => {
            return job.skills?.split(',').filter((jobSkill: string) => {                
                return jobSkill === skill.name;
            })
        });
    })
    const interviewsData = await getDataFromServer(token, 'interviews') as Interview[];
    const filteredInterviews = interviewsData && interviewsData.filter((interview: Interview) => {
        return applicantData && interview.applicationId === applicantData.id
    })
    const offersData = await getDataFromServer(token, 'offers') as Offer[];
    const filteredOffers = offersData && offersData.filter((offer: Offer) => {
        return applicantData && offer.applicantId === applicantData.id
    })
    

    return {
        applicant: applicantData || {},
        skills: filteredSkills || [],
        experiences: filteredExperiences || [],
        educations: filteredEducations || [],
        jobs: matchedJobs || [],
        applications: filteredApplications || [],
        interviews: filteredInterviews || [],
        offers: filteredOffers || [],
    };
}