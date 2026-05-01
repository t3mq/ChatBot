import { OLLAMA_URL, MODEL } from "../config/settings";

export async function sendMessage(messages, systemPrompt) {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: MODEL,
            stream: false,
            messages: [
                { role: "system", content: systemPrompt },
                ...messages 
            ]
        })
    });
    
    if(!res.ok) {
        throw new Error(`Ollama error: ${res.status}`);
    }

    const data = await res.json();
    return data.message.content;
}