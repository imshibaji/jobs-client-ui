export function ImageUpload(){
    return(
        <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8">
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-3">Profile Picture</h2>
                <img className="rounded-2xl aspect-square max-h-110" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" />
                <input type="file" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                    Upload
                </button>
            </div>
        </div>
    );
}