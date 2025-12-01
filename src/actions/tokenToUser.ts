import { User } from "@/utils/types/User";
import { verifyToken } from "@/utils/verifyToken";
import { ActionAPIContext, defineAction } from "astro:actions";
import { z } from "astro:schema";

export default defineAction({
    handler: async (_, context: ActionAPIContext) => {      
        const token = context.cookies.get('token')?.value;
        if(!token) return null;
        const jwtToken = await verifyToken(token);
        if(jwtToken) {
            const userData = jwtToken?.user as User;
            userData.id = jwtToken?.sub;
            return userData as User;
        }
    },
});