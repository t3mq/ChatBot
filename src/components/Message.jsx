import { Bot, User } from "lucide-react";

export default function Message({ message }) {
    const isUser = message.role === "user";

    return (
        <div className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div className={`flew items-center justify-center w-8 h-8 rounded-full shrink-0 ${isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bulle */}
            <div className={`
        max-w-[75%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words
        ${isUser
                    ? "bg-blue-500 text-white rounded-2xl rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm"
                }
      `}>
                {message.content}
            </div>
        </div>
    )
}