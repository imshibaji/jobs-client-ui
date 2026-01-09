export interface CardProps {
    title?: string;
    subtitle?: string;
    icon?: any;
    className?: string;
    action?: {
        label?: string;
        url?: string;
        icon?: any;
        onClick?: () => void;
    }
    children?: any;
}

export default function Card({ title, subtitle, icon, className, action, children }: CardProps) {
    return (
        <div className={"bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-8 border-violet-600" + (className ? " " + className : "")}>
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-violet-700 text-3xl font-extrabold flex items-center gap-2">
                            { icon || <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>}
                            { title || "Job Title" }
                        </h1>
                        <p className="text-gray-500 mt-1">{ subtitle || "" }</p>
                    </div>
                    { action?.onClick ? <button onClick={action.onClick} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition duration-200 shadow-md">
                        {action?.icon || "←"} { action?.label || "Go Back" }
                    </button> : <a href={action?.url || "#"} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition duration-200 shadow-md">
                        {action?.icon || "←"} { action?.label || "Go Back" }
                    </a> }
                    
                </div>
                
                <hr className="border-gray-200 my-6" />
                {children}
        </div>
    )
}