import { BASE_URL } from "astro:env/client";
import { useHttpClient } from "../useHttpClient";

export interface Feedback {
    id?: number;
    userId?: number;
    tableName: string;
    tableId: number;
    rating: number;
    comment: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string | File;
    orgName?: string;
    status?: string;
}

export enum FeedbackTableName {
    Jobs = 'jobs',
    Applicants = 'applicants',
    Interviews = 'interviews',
    Offers = 'offers',
    Companies = 'companies'
}

export enum FeedbackStatus {
    Pending = 'pending',
    Approved = 'approved',
    Declined = 'declined'
}

export enum FeedbackRating {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}

export const getDataList = (datas: Feedback[], tableName: FeedbackTableName): Feedback[] => {
    return datas.filter((data: Feedback) => data.tableName === tableName);
}

export const getDataFromServer = async (token: string, tableName: string) => {
    const {get} = useHttpClient(token);
    const data =  await get(BASE_URL + `/${tableName}`).then(res => res.json()) as any[];
    return data;
}