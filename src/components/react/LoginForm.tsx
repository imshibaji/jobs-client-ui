import { useState } from "react";
import { actions } from "astro:actions";
import Hero from "./Hero";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await actions.login({ email, password, rememberMe });
    if (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
      return;
    }
    if (data.access_token) {
      console.log("Login success:", data);
      window.location.href = '/user'; // Example redirect
    }
  };

  return (
    <div className="h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="hidden sm:block sm:w-1/2">
        {/* <img className="rounded-2xl" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" /> */}
        <Hero />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Logon Job Platform</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
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
                <a href="/forget" className="text-sm text-violet-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        {/* Social Login */}
        <div className="flex gap-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            <i className="fab fa-facebook-f mr-2"></i> Login with Facebook
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
            <i className="fab fa-google mr-2"></i> Login with Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-violet-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}