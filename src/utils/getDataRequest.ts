import { BASE_URL } from "astro:env/client";
import { useHttpClient } from "./useHttpClient";

export const getDataFromServer = async (token: string, tableName: string, userId?: string | number) => {
    const {get} = useHttpClient(token);
    const allData =  await get(BASE_URL + `/${tableName}`).then(res => res.json()) as any[];
    const data = userId ? allData.filter((item: any) => item.userId === userId) : allData;
    return data;
}