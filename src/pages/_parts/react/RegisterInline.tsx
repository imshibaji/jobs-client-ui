import React, { useState } from "react";
import Hero from "./Hero";
import { actions } from "astro:actions";

export default function RegisterInline() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log(formData);

        // Here you would typically handle the form submission, e.g., using fetch
        const { data, error } = await actions.register({
          name: formData.name!,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
          role: 'user',
        });

        if (error) {
            alert('Registration failed!');
            return;
        }

        if (data) {
            // console.log('Registration successful:', data);
            localStorage.setItem('userToken', data.access_token);
            alert('Registration successful!');
            window.location.href = '/register-after';
        } else {
            alert('Registration failed!');
        }
    }


  return (
    <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Register on Job Platform</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <hr className="border-gray-300 mt-3 mb-3" />
            <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <input value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} type="password" placeholder="Confirm Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200">
                Register
            </button>
        </form>
    </div>
  );
}
