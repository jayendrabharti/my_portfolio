"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/libs/cn";

export default function ScrollToTop(){
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e) => {
    if (e.target.scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const main = document.getElementById('main');

    main.addEventListener("scroll", toggleVisibility);
    return () => main.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const main = document.getElementById('main');
    main.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={()=>{
        if(isVisible)scrollToTop();
      }}
      className={cn(
        `fixed z-[1000000] bottom-6 right-6 p-2 rounded-full bg-zinc-600  text-white shadow-lg duration-200 transition-all`,
        isVisible?"opacity-100":"opacity-0"
      )}
    >
      <ArrowUp className="size-6 sm:size-8" />
    </button>
  );
};
