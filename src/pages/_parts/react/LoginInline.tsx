import { useState } from "react";
import { actions } from "astro:actions";
import Hero from "./Hero";

export default function LoginInline() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await actions.login({ email, password, rememberMe });
    if (error) {
      console.error("Login error:", error);
      alert("Login failed! Please check your credentials and try again.");
      return;
    }
    if (data) {
      console.log("Login successful:", data);
      // alert("Login successful!");
      if(data.role == 'admin') {
        window.location.href = '/admin'; // Example redirect
        return;
      }
      window.location.href = '/user'; // Example redirect
      return;
    }
  };

  return (
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Login Job Platform</h2>
        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
            <div className="sm:w-4/5 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            </div>
            <button type="submit" className="sm:w-1/5 bg-primary text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200">
              Login
            </button>
          </div>
          <div className="px-2">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember Me
                </label>
              </div>
              <div className="ml-auto">
                <a href="/forget" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}