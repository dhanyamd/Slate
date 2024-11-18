import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tag(props : HTMLAttributes<HTMLDivElement>){
    const {children, className, ...otherProps} = props
    
    return (
        <div className={twMerge("inline-flex border border-rose-500 text-rose-400 px-3 py-1 rounded-full uppercase items-center", className)} {...otherProps}>
            <span >&#10038; </span>
            <span className="text-sm ml-1">{children}</span>
        </div>
    )
}