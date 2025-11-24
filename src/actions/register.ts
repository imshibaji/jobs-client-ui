import { User } from "@/utils/types/User";
import { verifyToken } from "@/utils/verifyToken";
import { defineAction } from "astro:actions";
import { APP_URL } from "astro:env/server";
import { z } from "astro:schema";


export default defineAction({
    input: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        phoneNumber: z.string().min(10),
        password: z.string().min(8),
        role: z.string(),
        image: z.string(),
        instagramId: z.string().optional(),
        linkedinId: z.string().optional(),
        githubId: z.string().optional(),
        twitterId: z.string().optional(),
    }),
    handler: async (user: User, context) => {
        const token = context.cookies.get('token')?.value as string;

        const response = await fetch(APP_URL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user),
        }).then(response => response.json());

        const extract = await verifyToken(response.access_token);
        
        // Set the cookie
        const expDate = new Date(extract?.exp! * 1000);
        console.log(expDate);

        context.cookies.set('token', response.access_token, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: expDate,
        });

        return response;
    }
});