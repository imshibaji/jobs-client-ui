import { ImageUpload } from "./ImageUpload";

export default function ProfileForm() {
  return (
    <div className="min-h-[738px] py-8 bg-lavender flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <form className="flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-center px-4 sm:px-6 lg:px-8">
      <ImageUpload />
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8 w-full sm:max-w-1/2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Profile Settings</h2>
        <div className="space-y-3 sm:space-y-4">
            {/* Divider */}
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <p className="text-center font-semibold mx-4 mb-0">Login Details</p>
            </div>
            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              <div className="flex space-x-4">
                <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
              <div className="flex space-x-4">
                <input type="password" placeholder="Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                <input type="password" placeholder="Confirm Password" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
            </div>
            {/* Divider */}
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <p className="text-center font-semibold mx-4 mb-0">Social Details</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="linkedin">LinkedIn ID</label>
                <input type="text" placeholder="LinkedIn ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="instagram">Instagram ID</label>
                <input type="text" placeholder="Instagram ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="x">Twitter/X ID</label>
                <input type="text" placeholder="Twitter/X ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
              <div className="flex flex-row space-x-2 gap-2 w-full">
                <label className="w-1/4" htmlFor="x">Github ID</label>
                <input type="text" placeholder="GitHub ID" className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
              Update Profile
            </button>
          </div>
      </div>
      </form>
    </div>
  );
}