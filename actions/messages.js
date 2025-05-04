"use server";

import Message from "@/models/message";
import { connectToDB } from "@/utils/database";

export async function GetMessages() {
    try {
        await connectToDB();
        const messages = await Message.find();
        return JSON.stringify({ success: true, messages: messages });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function GetMessageById(id) {
    try {
        await connectToDB();
        const message = await Message.findById(id);
        return JSON.stringify({ success: true, message: message });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function UpdateMessageById(id, values) {
    try {
        await connectToDB();
        const message = await Message.findByIdAndUpdate(id, values, { new: true });
        return JSON.stringify({ success: true, message: message });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function DeleteMessageById(id) {
    try {
        await connectToDB();
        const message = await Message.findByIdAndDelete(id);
        return JSON.stringify({ success: true, message: message });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}

export async function CreateMessage(messageData) {
    try {
        await connectToDB();
        const message = await Message.create(messageData);
        return JSON.stringify({ success: true, message: message });

    } catch (error) {
        return JSON.stringify({ success: false, error: error.message });
    }
}