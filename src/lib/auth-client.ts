import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",

    /** The URL of the login page (optional if you're using the same domain) */
    loginURL: "/login",

    /** The URL of the logout page (optional if you're using the same domain) */
    logoutURL: "/logout",

    /** The URL of the register page (optional if you're using the same domain) */
    registerURL: "/register",

    /** The URL of the profile page (optional if you're using the same domain) */
    profileURL: "/profile",

    /** The URL of the callback page (optional if you're using the same domain) */
    callbackURL: "/callback",

    /** The URL of the error page (optional if you're using the same domain) */
    errorURL: "/error",

    plugins:[
        
    ],
});