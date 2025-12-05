import { ActionAPIContext, defineAction } from "astro:actions";

export default defineAction({
    handler: async (_, context: ActionAPIContext) => {
        const token = context.cookies.get('token')?.value as string;
        return token;
    }
});