import { User } from "@/utils/User";
import { defineAction } from "astro:actions";
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
        return user;
    }
});