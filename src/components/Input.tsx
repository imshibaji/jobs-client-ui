import { useEffect, useState } from "react";

export interface Props {
    className?: string;
    inputClass?: string;
    labelClass?: string;
    label?: string;
    [key: string]: any;
}
export default function Input({ className, inputClass, labelClass, label, ...props}: Props) {
    const [id, setId] = useState('');
    useEffect(() => {
        const random = ((Math.random() * 100)+ Date.now()).toFixed(0);
        setId("input-"+random);
    },[]);
    return (
        <div className={className || "w-full"}>
            { label && <label htmlFor={props.id || id} className={(labelClass || "block text-sm font-medium text-gray-700 mb-1")+ (props.error ? " text-red-500" : "")}>{label}</label>}
            <input {...props} type={ props.type || "text"} id={props.id || id} className={(inputClass || "w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm") + (props.error ? " border-red-500" : "")} />
            {props.error && <div className="text-red-500 text-xs mt-1">{props.error.message}</div>}
        </div>
    );
}