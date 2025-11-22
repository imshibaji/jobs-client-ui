import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    socialProviders: { 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID!, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
        } 
    }, 
});