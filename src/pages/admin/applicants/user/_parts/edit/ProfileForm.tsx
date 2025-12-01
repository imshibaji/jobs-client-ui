import { Applicant } from "@/utils/types/Applicant";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { ResumeFileUploader } from "./ResumeFileUploader";
// import toast from "react-hot-toast"; // Assuming you use react-hot-toast for notifications

// Define props with clear types for clarity and better development experience
interface ProfileFormProps {
    token: string;
    applicant?: Applicant; // Optional: ID of the applicant if we are in 'Edit' mode
    onSubmitSuccess?: (data: Applicant) => void | Promise<void>;
}

const defaultFormData: Applicant = {
    name: '',
    image: null,
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bio: '',
    dob: '',
    gender: '',
    email: '',
    phoneNumber: '',
    skills: '',
    experience: '',
    location: '',
    resume: null,
    userId: 0
};

export default function ProfileForm({ token, applicant, onSubmitSuccess }: ProfileFormProps) {
    const { get, post, put } = useHttpClient(token);
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState<Applicant>(defaultFormData);

    // 🚀 Initialization: Fetch Users and Existing Applicant Data
    useEffect(() => {        
        loadData();
    }, []);

    async function loadData() {
        try {
            // Fetch all users for the dropdown (assuming this is required for assignment)
            if (users.length === 0) {
                const usersData = await get(BASE_URL + '/users').then(res => res.json()) as User[];
                setUsers(usersData);
            }

            // If applicantId is provided, fetch existing data for EDIT mode
            if (applicant) {
                // Set form data from fetched data
                setFormData(applicant);
            }
        } catch (error) {
            console.error("Failed to load initial data:", error);
            // toast.error("Failed to load users or applicant data.");
        }
    }

    // 🛠️ Submission Logic
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (applicant) {
                // Update an existing applicant
                formData.userId = formData.userId || applicant.userId;
                const updatedApplicant = await put(`${BASE_URL}/applicants/${applicant.id}`, formData).then(res => res.json()) as Applicant;
                alert('Applicant updated successfully!');

                onSubmitSuccess && onSubmitSuccess(updatedApplicant);
            } else {
                // Create a new applicant
                const newApplicant = await post(`${BASE_URL}/applicants`, formData).then(res => res.json()) as Applicant;
                alert('Applicant created successfully!');

                onSubmitSuccess && onSubmitSuccess(newApplicant);
            }
        } catch (error) {
            console.error("Failed to submit profile:", error);
        };
    };
    // 🎨 UI Rendering
    return (
        <div className="bg-white p-6 sm:p-10 border border-gray-100">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {applicant?.id ? "✏️ Edit Candidate Profile" : "➕ Create A Candidate Profile"}
                </h2>
                <p className="text-md text-gray-500 mt-2">Manage your personal and professional profile details.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* **SECTION 1: Profile Picture & Basic Info** */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
                    {/* **1. Profile Picture** */}
                    <div className="md:col-span-1 bg-violet-50 rounded-xl p-6 shadow-inner flex flex-col items-center justify-center relative">
                        {/* File: Profile Picture */}
                        <ProfileImageUpload token={token} fileName={formData.image?.toString()} applicantId={applicant?.id?.toString()} onSubmitSuccess={(data) => {                        
                            setFormData({ ...formData, image: data.filename });
                            console.log(data);
                        }} />

                        <hr className="border-gray-300 mt-4 w-full" />

                        {/* File: Resume */}
                        <ResumeFileUploader token={token} applicantId={applicant?.id?.toString()} fileName={formData.resume?.toString()} onSubmitSuccess={(data) => {
                            setFormData({ ...formData, resume: data.filename });
                            console.log(data);
                        }} />
                    </div>

                    {/* **2. Personal Information Fields** */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Input: Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="name" placeholder="John Doe" name="name"
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                            </div>
                            {/* Input: DOB */}
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                                <input value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} type="date" id="dob" name="dob"
                                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:col-span-2">
                                {/* Select: Gender */}
                                <div className="w-full">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} id="gender" name="gender" className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150">
                                        <option value="">Select Gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                {/* Select: User ID (Assignment) */}
                                <div className="w-full">
                                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">Assigned User</label>
                                    <select value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} id="userId" className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required>
                                        <option value="">-- Assign to User --</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.id}. {user.name} - {user.email}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Textarea: Bio */}
                        <div className="mt-6">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">About Me (Bio)</label>
                            <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} id="bio" rows={2} placeholder="A brief description of yourself, your interests, and career goals..."
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required></textarea>
                        </div>

                        {/* **SECTION: Professional Details** */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Professional Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Input: Skills */}
                                <div>
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Top Skills (e.g., Comma Separated)</label>
                                    <input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} type="text" id="skills" placeholder="React, Node.js, Design"
                                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" />
                                </div>
                                {/* Input: Experience */}
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Total Experience (Years)</label>
                                    <input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} type="text" id="experience" placeholder="5 years"
                                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-300 my-8" />

                {/* **SECTION 2: Contact Information** */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Input: Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                        {/* Input: Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} type="tel" id="phoneNumber" placeholder="(555) 555-5555"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                    </div>

                    {/* Textarea: Address */}
                    <div className="mt-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" id="address" placeholder="123 Main St"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                    </div>

                    {/* Location Details (City, State, Zip, Country) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City / Village</label>
                            <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} type="text" id="city" placeholder="New York"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} type="text" id="state" placeholder="NY"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                        <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                            <input value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} type="text" id="zipCode" placeholder="10001"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} type="text" id="country" placeholder="USA"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" required />
                        </div>
                    </div>
                </div>

                {/* **SUBMIT BUTTON** */}
                <button type="submit" className="w-full bg-violet-600 text-white font-semibold py-3 rounded-xl hover:bg-violet-700 transition duration-200 shadow-xl shadow-violet-200/50 focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:shadow-none">
                    Save All Changes
                </button>
            </form>
        </div>
    )
}