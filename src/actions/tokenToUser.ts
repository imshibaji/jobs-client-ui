import { User } from "@/utils/types/User";
import { verifyToken } from "@/utils/verifyToken";
import { ActionAPIContext, defineAction } from "astro:actions";
import { z } from "astro:schema";

export default defineAction({
    input: z.object({
        token: z.string(),
    }),
    handler: async ({ token }) => {
        const jwtToken = await verifyToken(token);
        if(jwtToken) {
            const userData = jwtToken?.user as User;
            userData.id = jwtToken?.sub;
            return userData;
        }
        return null;
    },
});