import { useHttpClient } from "@/utils/useHttpClient";
import { ReactNode } from "react";

export interface Props {
    token: string
    title?: string,
    deletePostUrl?: string,
    cancelUrl?: string,
    class?: string,
    children?: ReactNode
}
export default function DeleteCard({ token, title, deletePostUrl, cancelUrl, class:className = "max-w-3xl", children }: Props) {
    const { delete: del } = useHttpClient(token);

    const onSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(deletePostUrl);
        
        try {
            const res = await del(deletePostUrl!);
            if(!res.ok) throw new Error("Failed to delete user");

            alert("Deleted successfully");
            // Redirect the user back after successful deletion
            window.location.href = cancelUrl || "/";
        } catch (error) {
            console.error("Failed to delete user:", error);
            // You might want to redirect to an error page or back with a message
        }
    }

    return (
        <div className={className + " w-full mx-auto"}>
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-8 border-red-600">
            
            {/* <!-- Header and Warning Icon --> */}
            <div className="flex flex-col items-center text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-red-700 text-3xl font-extrabold">
                    Confirm Deletion
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Are you absolutely sure you want to delete this {title?.toLowerCase() || "application"}? This action cannot be undone.
                </p>
            </div>
            
            <hr className="border-gray-200 my-6" />

            {/* <!-- Application Summary Block --> */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-4">
                <h2 className="text-xl font-bold text-red-800 border-b border-red-200 pb-2">{title} Details to be Deleted</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    { children || 
                    <div>
                        <div>
                            <p className="data-label">Applicant Name</p>
                            <p className="data-value">John Doe</p>
                        </div>
                        
                        {/* <!-- Job Title --> */}
                        <div>
                            <p className="data-label">Applied for Job</p>
                            <p className="data-value">Digital Marketing Associate</p>
                        </div>
                        
                        {/* <!-- Status --> */}
                        <div className="col-span-2">
                            <p className="data-label">Current Status</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800 shadow-sm">
                                Pending
                            </span>
                        </div>
                        
                        {/* <!-- Cover Letter Snippet --> */}
                        <div className="col-span-2">
                            <p className="data-label">Cover Letter Summary</p>
                            <p className="text-gray-700 italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                        </div>
                    </div>}
                </div>
            </div>

            {/* <!-- Action Buttons --> */}
            <div className="mt-8 flex justify-between gap-4">
                
                {/* <!-- Cancel Button (Safe Action) --> */}
                <a href={cancelUrl || '#'} className="w-1/2 text-center bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition duration-150">
                    Cancel and Keep
                </a>
                
                {/* <!-- Delete Button (Destructive Action) --> */}
                <form onSubmit={onSubmitted} className="w-1/2">
                    <button type="submit" className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition duration-150 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Yes, Delete Permanently
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}