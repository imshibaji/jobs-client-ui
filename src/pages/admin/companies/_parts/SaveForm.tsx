import { useEffect, useState } from "react";
import LogoUploader from "./LogoUploader";
import { Company } from "@/utils/types/Company";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { User } from "@/utils/types/User";

export default function SaveForm({token, companyId}: {token: string, companyId?: number | string}) {
    const {post, get, put} = useHttpClient(token);
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<Company>({
        name: "",
        industryType: "",
        size: "",
        recruiterName: "",
        phoneNumber: "",
        email: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        userId: 0,
        image: ""
    });

    useEffect(() => {
        onInit();
    }, [companyId]);

    const onInit = () => {
        console.log(companyId);
        
        get(`${BASE_URL}/users`)
        .then((res: Response) => {
            if (res.ok === false) {
                console.log(res.text());
                return;
            }
            return res.json()
            .then((data: User[]) => {
                setUsers(data);
            });
        })
        .catch((err) => {
            console.log(err);
        });
        if (companyId) {
            get(`${BASE_URL}/companies/${companyId}`)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Company) => {
                    console.log(data);
                    
                    setForm(data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (companyId) {
            return put(`${BASE_URL}/companies/${companyId}`, form)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Company) => {
                    console.log(data);
                    window.location.replace('/admin/companies');
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
           return post(`${BASE_URL}/companies`, form)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Company) => {
                    console.log(data);
                    window.location.replace('/admin/companies');
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };
    return (
        <div>
            <div className="w-full mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    {
                        companyId ? (
                            <h2 className="text-3xl font-bold text-gray-900">🏢 Edit Company</h2>
                        ) : (
                            <h2 className="text-3xl font-bold text-gray-900">🏢 Create New Company</h2>
                        )
                    }
                    <a href="/admin/companies" className="bg-violet-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-violet-600 transition duration-200 shadow-md">
                        ← Back to Companies
                    </a>
                </div>

                <p className="text-gray-500 mb-8">Enter the details for the new company profile and assign a user manager.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
                        
                        <LogoUploader token={token} fileName={form?.image} onSubmitSuccess={(data) => setForm({...form, image: data.filename})} />

                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">General Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Tech Company Pvt. Ltd." id="name" name="name" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                                </div>
                                
                                <div>
                                    <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
                                    <input value={form.industryType} onChange={(e) => setForm({ ...form, industryType: e.target.value })}type="text" placeholder="Technology" id="industryType" name="industryType" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                                </div>

                                <div>
                                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                                    <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}type="text" id="size" name="size" placeholder="10-50 employees" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                                </div>

                                <div>
                                    <label htmlFor="recruiterName" className="block text-sm font-medium text-gray-700 mb-1">Recruiter Name</label>
                                    <input value={form.recruiterName} onChange={(e) => setForm({ ...form, recruiterName: e.target.value })}type="text" id="recruiterName" name="recruiterName" placeholder="Akash Gupta" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Contact & Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}type="text" id="phone" name="phone" placeholder="(555) 123-4567" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}type="email" id="email" name="email" placeholder="contact@company.com" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} type="text" id="website" name="website" placeholder="https://company.com" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>
                            
                            <div className="md:col-span-3">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} type="text" id="address" name="address" placeholder="123 Corporate Blvd." className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>
                            
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} type="text" placeholder="Kolkata" id="city" name="city" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}type="text" placeholder="West Bengal"id="state" name="state" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}type="text" placeholder="India" id="country" name="country" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>

                                                        <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })}type="text" placeholder="700001" id="zipCode" name="zipCode" className="p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required/>
                            </div>

                            <div>
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">Assign Manager</label>
                                <select value={form.userId} onChange={(e) => setForm({ ...form, userId: Number(e.target.value) })}id="userId" name="userId" className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm" required>
                                    <option value="">Select User</option>
                                    {users && users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-violet-600 text-white font-semibold text-lg py-3 rounded-xl hover:bg-violet-700 transition duration-200 shadow-lg shadow-violet-200/50 focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50">
                            Save Company Profile
                        </button>
                    </div>
                </form>
                </div>
        </div>
    );
}