"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Main({ children, ...props }) {
    
    const pathname = usePathname();
    const mainRef = useRef(null);

    useEffect(() => {
        if (mainRef.current) {
          mainRef.current.scrollTo({top: 0});
        }
    }, [pathname]);

    return (
        <div 
            ref={mainRef}
            {...props}
        >
            {children}
        </div>
    );
}