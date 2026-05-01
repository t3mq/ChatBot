import { useState, useEffect } from "react";
import { sendMessage } from "../services/ollama";

export function useOllama() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [systemPrompt, setSystemPrompt] = useState("");

    useEffect(() => {
        fetch("/knowledge/base.md")
        .then((res) => res.text())
        .then((text) => setSystemPrompt(text))
        .catch(() => setSystemPrompt("Tu es un assistant utile et concis."))
    }, []);

    async function send(userText) {
        if(!userText.trim() || loading) return;

        const newMessages = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setLoading(true);
        setError(null);

        try {
            const reply = await sendMessage(newMessages, systemPrompt);
            setMessages([...newMessages, { role: "assistant", content: reply }]);
        } catch (err) {
            setError("Erreur lors de la connexion à Ollama. Vérifie qu'il tourne bien en local.");
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setMessages([]);
        setError(null);
    }

    return { messages, loading, error, send, reset };
}