import { User } from "@/utils/User";
import { useState } from "react";

export default function ChangePassword({ user, token }: { user: User, token: string }) {
    // Change Password
    const [changePassForm, setChangePassForm] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChangePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (changePassForm.password !== changePassForm.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log(changePassForm);
    };
    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full mt-5">
          <form onSubmit={handleChangePasswordSubmit} className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-3xl font-semibold text-center mb-6">Change Password</h2>
              <div className="flex space-x-4">
                    <input value={changePassForm.password} onChange={(e) => setChangePassForm({ ...changePassForm, password: e.target.value })} type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
                    <input value={changePassForm.confirmPassword} onChange={(e) => setChangePassForm({ ...changePassForm, confirmPassword: e.target.value })} type="password" placeholder="Confirm Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                Change Password
              </button>
          </form>
        </div>
    );
}