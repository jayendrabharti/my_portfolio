import { cn } from "@/libs/cn";
import { formatTimestamp } from "@/utils/common";
import { CheckCheck, Mail, Trash2Icon } from "lucide-react";
import { BsReplyFill } from "react-icons/bs";

export default function MessageCard({ message, deleteMessage, markAs}) {
  return (
    <div className="group p-6 bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg flex flex-col gap-4 border border-zinc-100 dark:border-zinc-700 relative">
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {message.subject}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
          <span className="text-zinc-700 dark:text-zinc-300">
            From: <span className="font-medium">{message.name}</span>
          </span>
          <span className="hidden sm:block text-zinc-400 dark:text-zinc-500">•</span>
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
            <Mail className="h-3.5 w-3.5" />
            <a 
              href={`mailto:${message.email}`}
              className="hover:underline"
            >
              {message.email}
            </a>
          </div>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-px w-full bg-zinc-100 dark:bg-zinc-700" />
      
      {/* Message Content */}
      <div className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
        {message.message}
      </div>

        {!message.isRead &&
        <span className="bg-green-500 absolute -right-0 -top-0 py-0 px-4 rounded-lg text-black font-bold">
            New
        </span>
        }

        
        {/* Divider */}
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-700" />

        <div className="flex w-full items-center justify-end gap-5">
          <button 
            className={cn(
              "flex flex-row items-center gap-2 rounded-full px-4 py-2 font-bold hover:ring-4 ring-zinc-500 active:scale-75 transition-all duration-100 text-white",
              message.isRead?"bg-blue-600":"bg-green-600"
            )}
            onClick={()=>{
              if(message.isRead){
                markAs(message._id,"unread");
              }else{
                markAs(message._id,"read");
              }
            }}
          >
                <CheckCheck/>
                Mark As&nbsp;{message.isRead?"Unread":"Read"}
            </button>

            <a 
              href={`mailto:${message.email}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-2 bg-sky-600 rounded-full px-4 py-2 font-bold hover:ring-4 ring-zinc-500 active:scale-75 transition-all duration-100 text-white"
            >
              <BsReplyFill/>
              Reply
            </a>
            
            <button 
              className="flex flex-row items-center gap-2 bg-red-600 rounded-full px-4 py-2 font-bold hover:ring-4 ring-zinc-500 active:scale-75 transition-all duration-100 text-white"
              onClick={()=>deleteMessage(message._id)}
            >
                <Trash2Icon/>
                Delete
            </button>
        </div>

    </div>
  );
}