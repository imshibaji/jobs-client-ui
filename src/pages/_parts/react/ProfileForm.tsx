import { User } from "@/utils/types/User";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";
import { BASE_URL } from "astro:env/client";
import ChangePassword from "./ChangePassword";

export default function ProfileForm({ user, token }: { user: User, token: string }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    linkedinId: user.linkedinId,
    instagramId: user.instagramId,
    twitterId: user.twitterId,
    githubId: user.githubId
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    console.log(BASE_URL+'/users/'+user.id);
    
    // Here you would typically handle the form submission, e.g., using fetch
    fetch(BASE_URL+'/users/'+user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: formData.name || user.name,
        email: formData.email || user.email,
        phoneNumber: formData.phoneNumber || user.phoneNumber,
        linkedinId: formData.linkedinId || user.linkedinId,
        instagramId: formData.instagramId || user.instagramId,
        twitterId: formData.twitterId || user.twitterId,
        githubId: formData.githubId || user.githubId
      }),
    }).then(response => response.json()).then(data => {
      console.log(data);

      // Update the user object in the parent component
      alert('Profile updated successfully!');
    });
  }

  return (
    <div className="min-h-[738px] py-8 bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-1/2">
        <ImageUpload user={user} token={token} />
        <ChangePassword token={token} />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full sm:max-w-1/2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Divider */}
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <p className="text-center font-semibold mx-4 mb-0">Login Details</p>
            </div>
            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-4">
              <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <div className="flex space-x-4">
                <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                <input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
            </div>
            {/* Divider */}
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <p className="text-center font-semibold mx-4 mb-0">Social Details</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="linkedin">LinkedIn ID</label>
                <input value={formData.linkedinId} onChange={(e) => setFormData({ ...formData, linkedinId: e.target.value })} type="text" placeholder="LinkedIn ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="instagram">Instagram ID</label>
                <input value={formData.instagramId} onChange={(e) => setFormData({ ...formData, instagramId: e.target.value })} type="text" placeholder="Instagram ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="x">Twitter/X ID</label>
                <input value={formData.twitterId} onChange={(e) => setFormData({ ...formData, twitterId: e.target.value })} type="text" placeholder="Twitter/X ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="x">Github ID</label>
                <input value={formData.githubId} onChange={(e) => setFormData({ ...formData, githubId: e.target.value })} type="text" placeholder="GitHub ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
              Update Profile
            </button>
          </form>
      </div>
      </div>
    </div>
  );
}