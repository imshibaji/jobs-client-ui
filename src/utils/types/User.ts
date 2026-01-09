export interface User { 
    id?: number | string;
    name: string; 
    email: string; 
    phoneNumber: string;
    password?: string; 
    image?: string; 
    role: string;
    status?: string;
    varifiedEmail?: boolean;
    varifiedPhoneNumber?: boolean;
    facebookId?: string;
    youtubeId?: string;
    instagramId?: string;
    linkedinId?: string;
    githubId?: string;
    twitterId?: string;
    isOnline?: boolean;
};

export enum Role {
    Admin = "admin",
    Employer = "employer",
    Editor = "editor",
    User = "user"
}

export enum Status {
    Active = "active",
    Inactive = "inactive",
    Suspended = "suspended"
}