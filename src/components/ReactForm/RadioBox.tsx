import { useEffect, useState } from "react";

export interface Props {
    className?: string;
    inputClass?: string;
    labelClass?: string;
    label: string;
    [key: string]: any;
}

export default function RadioBox({className, inputClass, labelClass, label, ...props}: Props) {
    const [id, setId] = useState('');
    useEffect(() => {
        const random = ((Math.random() * 100)+ Date.now()).toFixed(0);
        setId("input-"+random);
    },[]);
    return (
        <div className={className || "w-full"}>
            <div className="flex items-center gap-2">
                <input {...props} type={ props.type || "radio"} id={props.id || id} className={(inputClass || "checked:bg-violet-600 checked:border-violet-600 appearance-none w-5 h-5 border-2 border-slate-300 rounded bg-white checked:bg-brand-blue checked:border-brand-blue transition") + (props.error ? " border-red-500" : "")} />
                <label htmlFor={props.id || id} className={(labelClass || "flex-1 text-sm font-medium text-gray-700 hover:text-violet-600 mb-1")+ (props.error ? " text-red-500" : "")}>{label}</label>
                {props.badge && <span className="text-xs font-medium text-violet-600 border border-violet-600 rounded px-2">{props.badge}</span>}
            </div>
            {props.error && <div className="text-red-500 text-xs mt-1">{props.error.message}</div>}
        </div>
    )
}