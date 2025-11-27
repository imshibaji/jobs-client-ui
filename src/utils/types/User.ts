export type User = { 
    id?: number | string, 
    name: string, 
    email: string, 
    phoneNumber: string,
    password?: string, 
    image?: string, 
    role: string,
    varifiedEmail?: boolean,
    varifiedPhoneNumber?: boolean,
    status?: string,
    facebookId?: string,
    youtubeId?: string,
    instagramId?: string,
    linkedinId?: string,
    githubId?: string,
    twitterId?: string,
    isOnline?: boolean
};