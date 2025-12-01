export interface Company {
    id?: number;
    companyName: string;
    companyEmail: string;
    phoneNumber: string;
    recruiterName: string;
    companyWebsite: string;
    industryType: string;
    companySize: string;
    companyLocation: string;
    companyDescription: string;
    companyLogo: string;
    userId?: number;
}

export interface Job {
    id?: number;
    title: string;
    description: string;
    requirements: string;
    responsibilities: string;
    benefits: string;
    skills?: string;
    location?: string;
    salary?: string;
    salaryType?: string;
    salaryRange?: string;
    employmentType: string;
    experience?: string;
    isRemote?: boolean;
    companyId?: number;
    userId?: number;
}

export interface Application {
    id?: number;
    applicantId?: number;
    coverLetter: string;
    details: string;
    status: string;
    resume: string;
    interviewDate?: string;
    interviewTime?: string;
    interviewLocation?: string;
    feedback?: string;
    offerLetter?: string;
    offerDate?: string;
    joiningDate?: string;
    jobId?: number;
    userId?: number;
    companyId?: number;
    createdAt?: string;
}