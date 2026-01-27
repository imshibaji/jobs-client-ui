import React, { useState } from "react";
import Hero from "./Hero";
import { actions } from "astro:actions";

export default function Registration() {
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
    <div className="min-h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="hidden sm:block sm:w-1/2">
        {/* <img className="rounded-2xl" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" /> */}
        <Hero />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Register on Job Platform</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <hr className="border-gray-300 mt-3 mb-3" />
            <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} type="password" placeholder="Confirm Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-violet-800 transition duration-200">
                Register
            </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        {/* Social Login */}
        <div className="flex gap-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            <i className="fab fa-facebook-f mr-2"></i> Register with Facebook
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
            <i className="fab fa-google mr-2"></i> Register with Google
          </button>
        </div>

      </div>
    </div>
  );
}
