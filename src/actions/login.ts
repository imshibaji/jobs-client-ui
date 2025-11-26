import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { APP_URL } from "astro:env/server";
import { verifyToken } from "@/utils/verifyToken";
import { User } from "@/utils/types/User";

export default defineAction({
    input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        rememberMe: z.boolean().optional(),
    }),
    handler: async ({ email, password, rememberMe }, context) => {
        console.log(email, password, rememberMe);
        
        const response = await fetch(APP_URL +'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password, rememberMe }),
        });
        const data = await response.json();

        console.log(data);
        if(data.access_token) {
            const extract = await verifyToken(data.access_token);
            
            // Set the cookie
            const expDate = new Date(extract?.exp! * 1000);
            console.log(expDate);
            
            context.cookies.set('token', data.access_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                expires: expDate,    
            });

            // Update the user object / This error ignored because the user is not defined
            const user = extract?.user as User;
            user.id = extract?.sub;
            console.log(user);

            // Set the cookie
            context.cookies.set('user', JSON.stringify(user), {
                path: '/',
                httpOnly: true,
                secure: true,
                expires: expDate,    
            });
            return user;
        }
        return data;
    }
});