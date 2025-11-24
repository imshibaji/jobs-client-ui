export interface Applicant{
    id?: number;
    name: string;
    image?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    bio?: string;
    dob?: string;
    gender?: string;
    email: string;
    phoneNumber: string;
    skills: string;
    experience: string;
    location: string;
    resume: File | null;
    userId?: number;
}

export interface Skill{
    id?: number;
    name: string;
    proficiency: string;
    experience: string;
    applicantId?: number;
}

export interface Experience{
    id?: number;
    company: string;
    description: string;
    usedSkills: string[];
    location: string;
    startDate: string;
    endDate: string;
    applicantId?: number;
}

export interface Education{
    id?: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    grade?: string;
    description?: string;
    startDate: string;
    endDate: string;
    applicantId?: number;
}