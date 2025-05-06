import SignInButton from "@/components/SignInButton";
import { authOptions } from "@/utils/authOptions"
import { ArrowBigRight } from "lucide-react";
import { getServerSession } from "next-auth"
import Link from "next/link";

export default async function AdminLayout({children}) {
     
    const session = await getServerSession(authOptions);
    
    if(!session){
        return(
            <div className="w-full h-full flex justify-center items-center flex-col">
                <span className="text-3xl font-bold">You need to Log in to access this page</span>
                <SignInButton/>                
            </div>
        )
    }

    if(!session.user.isAdmin){
        return(
            <div className="w-full h-full flex justify-center items-center flex-col">
                <span className="text-3xl font-bold">You must be the owner to access this page.</span>
                <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold transition-all duration-150 active:scale-50 flex flex-row items-center group">
                    Go to Home Page <ArrowBigRight className="group-hover:ml-2 transition-all duration-150"/>
                </Link>
            </div>
        )
    }
    
    
    return children;
}