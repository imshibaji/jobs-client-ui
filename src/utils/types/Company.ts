import { Applicant } from "./Applicant";
import { User } from "./User";

export interface Company {
    id?: number;
    name: string;
    recruiterName: string;
    industryType: string;
    size?: string;
    image?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    email: string;
    phoneNumber: string;
    website?: string;
    description?: string;
    founded?: number;
    isVerified?: boolean;
    isDeleted?: boolean;
    userId?: number;
}

export enum EmploymentType {
    FULL_TIME = 'Full-time',
    PART_TIME = 'Part-time',
    CONTRACT = 'Contract',
    INTERNSHIP = 'Internship',
    TEMPORARY = 'Temporary',
    VOLUNTEER = 'Volunteer',
    OTHER = 'Other',
}

export enum SalaryType {
    HOURLY = 'Hourly',
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
    YEARLY = 'Yearly',
}

export enum SalaryRange {
    LESS_THAN_10K = '<10k',
    BETWEEN_10K_AND_20K = '10k-20k',
    BETWEEN_20K_AND_30K = '20k-30k',
    BETWEEN_30K_AND_40K = '30k-40k',
    BETWEEN_40K_AND_50K = '40k-50k',
    BETWEEN_50K_AND_60K = '50k-60k',
    BETWEEN_60K_AND_70K = '60k-70k',
    BETWEEN_70K_AND_80K = '70k-80k',
    BETWEEN_80K_AND_90K = '80k-90k',
    BETWEEN_90K_AND_100K = '90k-100k',
    MORE_THAN_100K = '>100k',
}

export enum Currency {
    INR = 'INR',
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    AUD = 'AUD',
    CAD = 'CAD',
    CNY = 'CNY',
    JPY = 'JPY',
    KRW = 'KRW',
    MXN = 'MXN',
    RUB = 'RUB',
    TRY = 'TRY',
    ZAR = 'ZAR',
}

export enum IndustryType {
    FINANCE = 'Finance',
    TECHNOLOGY = 'Technology',
    HEALTHCARE = 'Healthcare',
    EDUCATION = 'Education',
    MANUFACTURING = 'Manufacturing',
    RETAIL = 'Retail',
    SERVICES = 'Services',
    REAL_ESTATE = 'Real Estate',
    CONSTRUCTION = 'Construction',
    MEDIA = 'Media',
    AGRICULTURE = 'Agriculture',
    OTHER = 'Other',
}

export enum Size {
    employees_1_10 = '1 - 10 Employees',
    employees_11_50 = '11 - 50 Employees',
    employees_51_200 = '51 - 200 Employees',
    employees_201_500 = '201 - 500 Employees',
    employees_501_1000 = '501 - 1000 Employees',
    employees_1001_5000 = '1001 - 5000 Employees',
    employees_5001_10000 = '5001 - 10000 Employees',
    employees_10001_plus = '10001+ Employees',
}

export enum Experience {
    NO_EXPERIENCE = 'No Experience',
    ONE_YEAR = '1 Year',
    TWO_YEARS = '2 Years',
    THREE_YEARS = '3 Years',
    FOUR_YEARS = '4 Years',
    FIVE_YEARS = '5 Years',
    SIX_YEARS = '6 Years',
    SEVEN_YEARS = '7 Years',
    EIGHT_YEARS = '8 Years',
    NINE_YEARS = '9 Years',
    TEN_YEARS = '10 Years',
    MORE_THAN_10_YEARS = 'More than 10 Years',
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}


export interface Job {
    id?: number;
    title: string;
    description: string;
    experience?: string;
    employmentType: string;
    requirements: string;
    responsibilities: string;
    benefits: string;
    skills?: string;
    location?: string;
    currency?: string;
    salary?: string;
    salaryType?: string;
    salaryRange?: string;
    isRemote?: boolean;
    companyId?: number;
    userId?: number;
}

export function getCompany( companies: Company[], id: number | string): Company {
    return companies.filter((company: Company) => company.id === id)[0];
}

export function getJob( jobs: Job[], id: number | string): Job {
    return jobs.filter((job: Job) => job.id === id)[0];
}

export function getUser( users: User[], id: number | string): User {
    return users.filter((user: User) => user.id === id)[0];
}

export interface Application {
    id?: number;
    userId?: number;
    jobId?: number;
    applicantId?: number;
    coverLetter: string;
    details: string;
    resume: string;
    status: string;

    applicant?: Applicant;
    job?: Job;
    company?: Company;
    user?: User;
    interviews?: Interview[];
    offers?: Offer[];
    createdAt?: string;
    updatedAt?: string;
}

export enum ApplicationStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    SHORTLISTED = 'Shortlisted',
    INTERVIEW_SCHEDULED = 'Interview Scheduled',
    OFFER_LETTER_SENT = 'Offer Letter Sent',
    OFFER_ACCEPTED = 'Offer Accepted',
    OFFER_DECLINED = 'Offer Declined',
    OFFER_EXPIRED = 'Offer Expired',
    JOINING_DATE_SET = 'Joining Date Set',
    COMPLETED = 'Completed',
}

export function getOfferByApplicationId( offers: Offer[], applicantId: number | string): Offer {
    return offers.filter((offer: Offer) => offer.applicationId === applicantId)[0];
}

export function getInterviewByApplicationId( interviews: Interview[], applicationId: number | string): Interview {
    return interviews.filter((interview: Interview) => interview.applicationId === applicationId)[0];
}

export function getApplication( applications: Application[], id: number | string): Application {
    return applications.filter((application: Application) => application.id === id)[0];
}

export function getApplications( applications: Application[], jobId: number | string): Application[] {
    return applications.filter((application: Application) => application.jobId === jobId);
}

export function getApplicationsByUser( applications: Application[], userId: number | string): Application[] {
    return applications.filter((application: Application) => application.userId === userId);
}

export function getApplicationsByStatus( applications: Application[], status: string): Application[] {
    return applications.filter((application: Application) => application.status === status);
}

export interface Interview {
    id?: number | string;
    applicationId?: number | string;
    userId?: number | string;  // Interviewer / Recruiter ID
    date: string;
    time: string;
    location: string;
    notes?: string;
    feedback?: string;
    status?: string;

    application?: Application;
    applicant?: Applicant;
    job?: Job;
    company?: Company;
}

export enum InterviewStatus {
    SCHEDULED = 'Scheduled',
    PENDING = 'Pending',
    PROGRESS = 'Progress',
    REJECTED = 'Rejected',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
}

export function getApplicant( applicants: Applicant[], id: number | string): Applicant {
    return applicants.filter((applicant: Applicant) => applicant.id === id)[0];
}

export interface Offer {
    id?: number | string;
    applicationId?: number | string;
    applicantId?: number | string;
    userId?: number | string;
    jobId?: number | string;
    message: string;
    date: string;
    status?: string;
    type?: string;
    attachment?: string | File;
}

export enum OfferStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    DECLINED = 'Declined',
    EXPIRED = 'Expired',
}

export enum OfferType {
    PERMANENT = 'Permanent',
    FULL_TIME = 'Full Time',
    PART_TIME = 'Part Time',
    INTERNSHIP = 'Internship',
    VOLUNTEER = 'Volunteer',
    TEMPORARY = 'Temporary',
    CONTRACT = 'Contract',
}
