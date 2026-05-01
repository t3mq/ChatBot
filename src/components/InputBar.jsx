import { useState } from "react";
import { Send } from "lucide-react";

export default function InputBar({ onSend, loading }) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t border-gray-200 bg-white">

      <textarea
        className="
          flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2.5
          text-sm leading-relaxed outline-none max-h-32
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          placeholder:text-gray-400 transition-all
        "
        rows={1}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onKeyDown={handleKeyDown}
        placeholder="Écris ton message... (Entrée pour envoyer)"
        disabled={loading}
      />

      <button
        onClick={handleSend}
        disabled={loading || !input.trim()}
        className="
          flex items-center justify-center w-10 h-10 rounded-full
          bg-blue-500 text-white shrink-0
          hover:bg-blue-600 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all
        "
      >
        <Send size={16} />
      </button>

    </div>
  );
}