import { LoaderCircleIcon } from "lucide-react";

export default function loading(){
    return(
        <div className="flex items-center justify-center w-full h-full">
            <LoaderCircleIcon size={20} className="animate-spin"/>
        </div>
    )
}