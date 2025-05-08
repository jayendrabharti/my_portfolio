"use client";

import { DeleteMessageById, GetMessages, UpdateMessageById } from "@/actions/messages";
import MessageCard from "@/components/Messages/MessageCard";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Messages() {
    const [messages, setMessages] = useState(null);
    const [filter, setFilter] = useState("all"); // State for filter

    useEffect(() => {
        const get = async () => {
            const data = JSON.parse(await GetMessages());
            setMessages(data.messages);
        };
        get();
    }, []);

    const filteredMessages = messages
        ? messages.filter((message) => {
              if (filter === "all") return true;
              if (filter === "read") return message.read;
              if (filter === "unread") return !message.read;
          })
        : [];

    const deleteMessage = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this Message?");
        if (!confirmDelete) return;

        const data = JSON.parse(await DeleteMessageById(id));
        if (data.success) {
            alert("Deleted Successfully");
            setMessages((prev) => prev.filter((m) => m._id !== id));
        } else {
            alert("Not able to delete!! Refresh and try again!!");
        }
    };

    const markAs = async (id,readUnread) => {

        const isRead = readUnread == "read";
        const data = JSON.parse(await UpdateMessageById(id,{isRead: isRead}));

        if (data.success) {
            setMessages((prev) => prev.map((m) =>{
                if(m._id == id){
                    return {...m, isRead: isRead}
                }
                return m;
            }));
        } else {
            alert("Not able to delete!! Refresh and try again!!");
        }
    };
        



    if (!messages)
    return (
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin text-black dark:text-white size-20" />
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4">
            <div className="mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded-lg ${
                        filter === "all" ? "bg-blue-500 text-white" : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg ${
                        filter === "read" ? "bg-blue-500 text-white" : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                    onClick={() => setFilter("read")}
                >
                    Read
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${
                        filter === "unread" ? "bg-blue-500 text-white" : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                    onClick={() => setFilter("unread")}
                >
                    Unread
                </button>
            </div>
            {!filteredMessages.length && (
                <span className="text-2xl font-bold">No Messages Yet</span>
            )}
            <div className="w-full flex flex-col gap-6">
                {filteredMessages.map((message, index) => (
                    <MessageCard 
                        message={message} 
                        key={index}
                        deleteMessage={deleteMessage} 
                        markAs={markAs}
                    />
                ))}
            </div>
        </div>
    );
}