import { useHttpClient } from "@/utils/useHttpClient";
import { ActionAPIContext, defineAction } from "astro:actions";
import { APP_URL } from "astro:env/server";
import { z } from "astro:schema";

export default defineAction({
    input: z.object({
        // No input needed for this action
        tableName: z.string({ required_error: "Table name is required" }),
        userId: z.string({ required_error: "User ID is required", invalid_type_error: "User ID must be a string" }).optional(),
    }),
    handler: async (inputs, context: ActionAPIContext) => {
        // Simulate fetching data from the server
        const token = context.cookies.get('token')?.value as string;
        if (!token) {
            throw new Error("No token found in cookies");
        }
        const allData = await useHttpClient(token).get(APP_URL + `/${inputs.tableName}`).then(res => res.json()) as any[];
        const data = inputs.userId ? allData.filter((item: any) => item.userId == inputs.userId) : allData;
        
        return data;
    }
});