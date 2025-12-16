import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { Feedback, FeedbackStatus, FeedbackTableName, getDataFromServer } from "@/utils/types/Feedback";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SaveForm({token, feedbackId}: {token: string, feedbackId?: string}) {
    const {get, post, put, upload} = useHttpClient(token);
    const [tableData, setTableData] =  useState<any[]>([]);
    const [users, setUsers] =  useState<User[]>([]);
    const { register, handleSubmit, setValue, formState: { errors}, watch} = useForm<Feedback>();
    watch((data) => {
        const tableName = data.tableName as string;
        if (!tableName) return;
        getDataFromServer(token, tableName).then((data:any) => {
            const reData = data.map((item: any) => ({id: item.id, name: item.coverLetter || item.title || item.notes || item.message || item.name || `ID: ${item.id}`}));
            setTableData(reData);
            // console.log(data);
        });
    });

    useEffect(() => {
        onInit();
    }, [feedbackId]);

    const onInit = async () => {
        const usersData = await getDataFromServer(token, 'users') as User[];
        setUsers(usersData);
        if (feedbackId) {
            const data = await get(BASE_URL + `/feedbacks/${feedbackId}`).then(res => res.json()) as Feedback;
            // console.log(data);
            setValue('id', data.id);
            setValue('userId', data.userId);
            setValue('tableName', data.tableName);
            setValue('rating', data.rating);
            setValue('comment', data.comment);
            setValue('status', data.status);
            setValue('avatar', data.avatar);
            setValue('orgName', data.orgName);
            setValue('name', data.name);
            setValue('email', data.email);
            setValue('phone', data.phone);
            setValue('tableId', data.tableId);

            // console.log(data.tableName);
            
            const tableDataFromServer = await getDataFromServer(token, data.tableName) as any[];
            const reData = tableDataFromServer.map((item: any) => ({id: item.id, name: item.coverLetter || item.title || item.notes || item.message || item.name || `ID: ${item.id}`}));
            setTableData(reData);
            setValue('tableId', data.tableId);
        }
    }

    const imageUpload = async (event: any) => {
        const file = event.target.files[0] as File;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'feedbacks');
        formData.append('customName', 'feedback-avatar-' + Date.now());
        return await upload(BASE_URL + '/upload', formData).then(res => res.json());
    }

    const onSubmit = async (data: Feedback) => {
        // console.log(data);

        if(data.avatar instanceof File && data.avatar.size > 0) {
            const dataImg = await imageUpload(data.avatar);
            data.avatar = dataImg.filename;
        }
        
        if (feedbackId) {
            await put(BASE_URL + `/feedbacks/${feedbackId}`, data);
            alert('Feedback updated successfully!');
            window.location.href = '/admin/feedbacks';
        } else {
            
            await post(BASE_URL + '/feedbacks', data);
            alert('Feedback created successfully!');
            window.location.href = '/admin/feedbacks';
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, (errors: any) => console.log(errors))} className="flex flex-col space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <Select {...register('tableName', { required: "Table Name is required" })} error={errors.tableName} label="Table Name*" name="tableName">
                        <option value="">Select a table</option>
                        { FeedbackTableName && Object.values(FeedbackTableName).map((tableName) => (
                            <option key={tableName} value={tableName}>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</option>
                        ))}
                    </Select>
                    <Select {...register('tableId', { required: "Table ID is required" })} error={errors.tableId} label="Table ID*" name="tableId">
                        <option value="">Select a table ID</option>
                        {
                            tableData.map((item: any) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Select>
                    <Select {...register('userId')} label="User" name="userId">
                        <option value="">Select a User</option>
                        {
                            users && users.map((user: User) => (
                                <option key={user.id} value={user.id}>{user.name || `ID: ${user.id}`}</option>
                            ))
                        }
                    </Select>
                </div>
                <TextArea {...register('comment', { required: "Comment is required", minLength: { value: 10, message: "Comment must be at least 10 characters" } })} error={errors.comment} label="Comment*" name="comment" type="text" placeholder="Write Your Comment Here" />
                <div className="grid md:grid-cols-3 gap-4">
                    <Input {...register('rating', { required: "Rating is required", min: { value: 1, message: "Rating must be at least 1" }, max: { value: 5, message: "Rating must be at most 5" } })} error={errors.rating} label="Rating (1-5)*" name="rating" type="number" placeholder="1-5" />
                    <Select {...register('status', { required: "Status is required" })} error={errors.status} label="Status" name="status">
                        <option value="">Select a status</option>
                        {
                            FeedbackStatus && Object.values(FeedbackStatus).map((status) => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                            ))
                        }
                    </Select>
                    <Input {...register('avatar')} label="Avatar" name="avatar" type="file" />
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                    <Input {...register('name', { required: "Name is required", minLength: { value: 6, message: "Name must be at least 6 characters" } })} error={errors.name} label="Name*" name="name" type="text" placeholder="Input Name" />
                    <Input {...register('email', { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} error={errors.email} label="Email*" name="email" type="email" placeholder="Input Email" />
                    <Input {...register('phone')} label="Phone" name="phone" type="text" placeholder="Input Phone" />
                    <Input {...register('orgName')} label="Organization Name" name="orgName" type="text" placeholder="Input Organization Name" />
                </div>
                <button className={"bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-200"} type="submit">Save Feedback</button>
            </form>
        </div>
    );
}