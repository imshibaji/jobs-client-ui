export interface Applicant{
    id?: string | number;
    name: string;
    image?: File | string | null;
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
    resume: File | string | null;
    userId?: string | number;
}

export interface Skill{
    id?: string | number;
    name: string;
    proficiency: string;
    experience: string;
    applicantId?: string | number;
}

export interface Experience{
    id?: string | number;
    company: string;
    description: string;
    usedSkills: string[];
    location: string;
    startDate: string;
    endDate: string;
    applicantId?: string | number;
}

export interface Education{
    id?: string | number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    grade?: string;
    description?: string;
    startDate: string;
    endDate: string;
    applicantId?: string | number;
}