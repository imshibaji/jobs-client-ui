import { Company } from "@/utils/types/Company";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";


export default function Delete({token, companyId }: { token: string, companyId?: number | string }) {
    const {get} = useHttpClient(token);
    const [company, setCompany] = useState<Company | null>(null);

    
    useEffect(() => {
        console.log(companyId);
        
        // You would replace this with actual backend logic to fetch the company details
        get(`${BASE_URL}/companies/${companyId}`)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Company) => {
                    data.image = BASE_URL + '/file/view?folder=pictures&filename='+data.image;
                    setCompany(data);
                });
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [companyId]);


    const handleDelete = () => {
        // You would replace this with actual backend logic to delete the company
        console.log('Deleted company:', company);
    };


return (
    <div className="flex justify-center">
        <div className="max-w-xl w-full bg-white shadow-2xl rounded-xl border border-red-200">
            
            <div className="p-6 sm:p-8 text-center border-b border-red-100">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-800 tracking-tight" id="modal-title">
                    Confirm Deletion of Company Profile
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    Are you absolutely sure you want to permanently delete **{company?.name}**? This action cannot be undone.
                </p>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Company Details to be Deleted:</h4>
                
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    
                    <div className="col-span-2 flex items-center mb-2">
                        <img 
                            src={company?.image || '/logo.png'} 
                            alt={`${company?.name} Logo`} 
                            className="h-10 w-10 object-cover rounded-full border border-gray-300 mr-3"
                        />
                        <span className="font-bold text-lg text-gray-900">{company?.name}</span>
                    </div>

                    <p><strong className="text-gray-600">Industry:</strong> {company?.industryType}</p>
                    <p><strong className="text-gray-600">Size:</strong> {company?.size}</p>
                    
                    <p><strong className="text-gray-600">Email:</strong> {company?.email}</p>
                    <p><strong className="text-gray-600">Website:</strong> <a href={company?.website} target="_blank" className="text-violet-600 hover:text-violet-800">{company?.website}</a></p>
                    
                    <p className="col-span-2"><strong className="text-gray-600">Location:</strong> {company?.city}, {company?.state}, {company?.country}</p>

                    <p className="col-span-2 text-xs italic text-gray-500 mt-2">
                        Managed by User ID: {company?.userId} (Recruiter: {company?.recruiterName})
                    </p>
                </div>
            </div>

            <div className="p-6 sm:px-8 sm:py-6 bg-gray-50 flex flex-col sm:flex-row-reverse justify-between gap-3 rounded-b-xl">
                
                <button onClick={handleDelete} type="button" className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-red-600 text-base font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 sm:ml-3 sm:text-sm">
                    Yes, Permanently Delete
                </button>
                
                {/* Cancel Button */}
                <a href="/admin/companies" 
                    className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 sm:mt-0 sm:text-sm">
                    Cancel / Go Back
                </a>
            </div>
        </div>
    </div>
);
}