import Input from "@/components/Input";
import { Company } from "@/utils/types/Company";
import { useHttpClient } from "@/utils/useHttpClient";
import { actions } from "astro:actions";
import { BASE_URL } from "astro:env/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SaveForm({token, companyId}: {token: string, companyId?: string}) {
    const {get, post, put} = useHttpClient(token);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Company>();

    useEffect(() => {
        onInit();
    }, [companyId]);

    const onInit = () => {        
        if(companyId) {
            // Fetch existing company details to populate the form
            get(`${BASE_URL}/companies/${companyId}`).then(res => res.json()).then((data: Company) => {
                console.log(data);
                
                setValue("name", data.name);
                setValue("industryType", data.industryType);
                setValue("description", data.description);
                setValue("website", data.website);
                setValue("recruiterName", data.recruiterName);
                setValue("phoneNumber", data.phoneNumber);
                setValue("email", data.email);
                setValue("address", data.address);
                setValue("city", data.city);
                setValue("state", data.state);
                setValue("country", data.country);
                setValue("zipCode", data.zipCode);
                setValue("size", data.size);
                setValue("founded", data.founded);
                setValue("image", data.image);
                setValue("isVerified", data.isVerified);
                setValue("userId", data.userId);
            }).catch(err => {
                alert("Error fetching company details: " + err.message);
            });
        }
    };

    const onSubmit = async (data: Company) => {
        const {data: user, error} = await actions.tokenToUser();
        data.userId = Number(user?.id);
        if(companyId) {
            // Update existing company
            await put(`/companies/${companyId}`, data).then(res => {
                alert("Company details updated successfully!");
            }).catch(err => {
                alert("Error updating company details: " + err.message);
            });
        } else {
            // Create new company
            await post('/companies', data).then(res => {
                alert("Company details saved successfully!");
            }).catch(err => {
                alert("Error saving company details: " + err.message);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <h3 className="text-left text-purple-700 font-headline text-2xl font-bold">Company Details</h3>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input className="sm:w-2/3" {...register("name", { required: true })} error={errors.name} label="Company Name*" id="company" name="name" placeholder="Company Name" />
                <Input className="sm:w-1/3" {...register("industryType", { required: true })} error={errors.industryType} label="Industry Type*" id="industry" name="industryType" placeholder="Industry Type" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description">Company Description</label>
                <textarea id="description" placeholder="Company Description" name="description" rows={4} className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"></textarea>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="website">Company Website</label>
                <input type="text" placeholder="Company Website" id="website" name="website" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="logo">Contact Person</label>
                <input type="text" placeholder="Contact Person" id="logo" name="logo" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="phone">Contact Number</label>
                <input type="text" placeholder="Contact Number" id="phone" name="phone" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Contact Email</label>
                <input type="text" placeholder="Contact Email" id="email" name="email" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="address">Company Register Address</label>
                <input type="text" placeholder="Company Address" id="address" name="address" className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                <div className="flex flex-row gap-2 mt-4">
                    <input type="text" placeholder="City" id="city" name="city" className="w-1/3 rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    <input type="text" placeholder="State" id="state" name="state" className="w-1/3 rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                    <input type="text" placeholder="Country" id="country" name="country" className="w-1/3 rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-purple-500" />
                </div>
            </div>
            <div className="flex flex-col gap-2 py-4">
            <button type="submit" className="bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">Save Details</button>
            </div>
        </form>
    );
}