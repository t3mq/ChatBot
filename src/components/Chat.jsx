import { useRef, useEffect } from "react";
import { Loader2, RotateCcw, Bot } from "lucide-react";
import Message from "./Message";
import InputBar from "./InputBar";
import { useOllama } from "../hooks/useOllama";

export default function Chat() {
  const { messages, loading, error, send, reset } = useOllama();
  const bottomRef = useRef(null);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
            <Bot size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Assistant</p>
            <p className="text-xs text-gray-400">Mistral · Ollama</p>
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RotateCcw size={13} />
          Nouvelle conversation
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        {/* État vide */}
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
            <Bot size={32} className="text-gray-300" />
            <p className="text-sm">Pose ta première question</p>
          </div>
        )}

        {/* Liste des messages */}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 shrink-0">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mx-auto my-2 max-w-sm text-center text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <InputBar onSend={send} loading={loading} />

    </div>
  );
}