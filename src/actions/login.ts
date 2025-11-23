import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { APP_URL } from "astro:env/server";
import { verifyToken } from "@/utils/verifyToken";
import { User } from "@/utils/User";

export default  defineAction({
    input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        rememberMe: z.boolean().optional(),
    }),
    handler: async ({ email, password, rememberMe }, context) => {
        const response = await fetch(APP_URL +'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, rememberMe }),
        });
        const data = await response.json();
        console.log(data);
        if(data.access_token) {
            const extract = await verifyToken(data.access_token);

            // Update the user object / This error ignored because the user is not defined
            context.locals.user = extract?.user as User;
            console.log(context.locals.user);
            
            // Set the cookie
            const expDate = new Date(extract?.exp! * 1000);
            console.log(expDate);
            
            context.cookies.set('token', data.access_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                expires: expDate,    
            });
        }       
        return data;
    }
});