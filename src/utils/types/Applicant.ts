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
    resume?: string;
    userId?: string | number;
}

export interface Skill{
    id?: string | number;
    name: string;
    proficiency: string;
    experience: string;
    lastUsed: string;
    applicantId?: string | number;
    isEditing?: boolean;
}

export interface Experience{
    id?: string | number;
    company: string;
    position: string;
    usedSkills: string;
    location: string;
    startDate: string;
    endDate: string;
    applicantId?: string | number;
    isEditing?: boolean;
}

export interface Education{
    id?: string | number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    grade?: string;
    startDate: string;
    endDate: string;
    applicantId?: string | number;
    isEditing?: boolean;
}

export interface Portfolio{
    id?: string | number;
    title: string;
    description: string;
    url: string;
    image?: string;
    applicantId?: string | number;
}

export interface Project{
    id?: string | number;
    name: string;
    description: string;
    usedSkills: string[];
    image?: string;
    url?: string;
    startDate: string;
    endDate: string;
    applicantId?: string | number;
}

export interface Certificate{
    id?: string | number;
    name: string;
    description: string;
    date: string;
    image?: string;
    url?: string;
    applicantId?: string | number;
}