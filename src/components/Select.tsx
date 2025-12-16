import { useEffect, useState } from "react";

interface Props {
    className?: string;
    inputClass?: string;
    labelClass?: string;
    label?: string;
    options?: string[] | { value: string; label: string }[];
    [key: string]: any
}
export default function Select({ className, inputClass, labelClass, label, ...props}: Props) {
    const [id, setId] = useState('');
    useEffect(() => {
        const random = ((Math.random() * 100)+ Date.now()).toFixed(0);
        setId("select-"+random);
    },[]);
    return (
        <div className={className || "w-full"}>
            { label && <label htmlFor={props.id || id} className={(labelClass || "block text-sm font-medium text-gray-700 mb-1") + (props.error ? " text-red-500" : "")}>{label}</label>}
            <select {...props} id={props.id || id} className={(inputClass || "w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm") + (props.error ? " border-red-500" : "")}>
                {props.children ||  props.options && props.options.map((option: string | { value: string; label: string }, index) => <option key={index} value={typeof option === 'string' ? option : option.value}>{typeof option === 'string' ? option : option.label}</option>) }
            </select>
            {props.error && <div className="text-red-500 text-xs mt-1">{props.error.message}</div>}
        </div>
    );
}