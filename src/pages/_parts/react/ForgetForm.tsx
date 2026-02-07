export default function ForgetForm() {

  return (
    <div className="h-[738px] bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* <div className="hidden sm:block sm:w-1/2">
        <img className="rounded-2xl" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" />
      </div> */}
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Forget Password?</h2>

        {/* Form Fields */}
        <form className="space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-4">
              <input type="email" placeholder="Put Your Registered Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200">
              Send Reset Link
            </button>
        </form>
      </div>
    </div>
  );
}