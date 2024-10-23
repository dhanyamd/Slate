'use client'

import { cn } from "@/app/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./ui/button";

interface iAppProps{
    className? : string;
    children : ReactElement<ButtonProps>[]
}

export default function ButtonGroup({className, children}: iAppProps){
     const totalButtons = Children.count(children)
    return (
        <div className={cn("flex w-full")}>
        {children.map((child, index) => {
            const firstItem = index === 0;
            const lastItem = index === totalButtons - 1;
             
            return cloneElement(child, {
                className : cn({
                    "rounded-l-none" : !firstItem,
                    "rounded-r-none" : !lastItem,
                    "border-l-0": !firstItem
                }, child.props.className)
            })
        })}
        </div>
    )
}