import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Company } from "@/utils/types/Company";
import { useHttpClient } from "@/utils/useHttpClient";
import { actions } from "astro:actions";
import { BASE_URL } from "astro:env/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "./ImageUploader";

export default function SaveForm({token, companyId}: {token: string, companyId?: string}) {
    const {get, post, put} = useHttpClient(token);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Company>();

    useEffect(() => {
        onInit();
    }, [companyId]);

    const onInit = () => {        
        if(companyId) {
            // Fetch existing company details to populate the form
            get(`${BASE_URL}/companies/${companyId}`).then(res => res.json()).then((data: Company) => {
                // console.log(data);
                
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
            await put(`${BASE_URL}/companies/${companyId}`, data).then(res => {
                alert("Company details updated successfully!");
            }).catch(err => {
                alert("Error updating company details: " + err.message);
            });
        } else {
            // Create new company
            await post(BASE_URL + '/companies', data).then(res => {
                alert("Company details saved successfully!");
            }).catch(err => {
                alert("Error saving company details: " + err.message);
            });
        }
        window.location.href = '/emp/companies';
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <h3 className="text-left text-purple-700 font-headline text-2xl font-bold">Company Details</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/3">
                    <ImageUploader token={token} fileName={watch("image")} onSubmitSuccess={(data) => setValue("image", data.filename)} />
                </div>
                <div className="sm:w-2/3 gap-4 flex flex-col">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input className="sm:w-2/3" {...register("name", { required: "Company Name is required" })} error={errors.name} label="Company Name*" id="company" name="name" placeholder="Company Name" />
                        <Input className="sm:w-1/3" {...register("industryType", { required: "Industry Type is required" })} error={errors.industryType} label="Industry Type*" id="industry" name="industryType" placeholder="Industry Type" />
                    </div>
                    <TextArea {...register("description", { required: "Description is required" })} error={errors.description} label="Company Description*" id="description" name="description" placeholder="Company Description" />
                    <Input {...register("website", { required: "Company Website is required" })} error={errors.website} label="Company Website*" id="website" name="website" placeholder="Company Website" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input type="text" placeholder="Contact Person" id="recruiterName" {...register("recruiterName", { required: "Contact Person is required" })} error={errors.recruiterName} label="Contact Person*" name="recruiterName"  />
                <Input type="text" placeholder="Contact Number" id="phoneNumber" {...register("phoneNumber", { required: "Contact Number is required" })} error={errors.phoneNumber} label="Contact Number*" name="phoneNumber"  />
                <Input type="text" placeholder="Contact Email" id="email" {...register("email", { required: "Contact Email is required" })} error={errors.email} label="Contact Email*" name="email"  />
            </div>
            <Input {...register("address", { required: "Address is required" })} error={errors.address} label="Address*" id="address" name="address" placeholder="Address" />
            <div className="flex flex-col sm:flex-row gap-2">
                <Input type="text" {...register("city", { required: "City is required" })} error={errors.city} placeholder="City" id="city" label="City*" name="city" />
                <Input type="text" {...register("state", { required: "State is required" })} error={errors.state} placeholder="State" id="state" label="State*" name="state" />
                <Input type="text" {...register("country", { required: "Country is required" })} error={errors.country} placeholder="Country" id="country" label="Country*" name="country" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input type="text" {...register("size", { required: "Company Size is required" })} error={errors.size} placeholder="Company Size" id="size"label="Company Size*" name="size" />
                <Input type="text" {...register("founded", { required: "Founded Year is required" })} error={errors.founded} placeholder="Founded Year" id="founded" label="Founded Year*" name="founded" />
                <Input type="text" {...register("zipCode", { required: "Zip Code is required" })} error={errors.zipCode} placeholder="Zip Code" id="zipCode" label="Zip Code*" name="zipCode" />
            </div>
            
            <div className="flex flex-col gap-2 py-4">
                <button type="submit" className="bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">Save Details</button>
            </div>
        </form>
    );
}