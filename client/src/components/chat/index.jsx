import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const res = await fetch('https://your-ai-agent-api.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: input }),
            });

            const data = await res.json();
            const botMessage = { from: 'bot', text: data?.response || 'Sorry, no response.' };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { from: 'bot', text: '⚠️ Failed to connect to AI service.' },
            ]);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-80 h-96 bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden border border-gray-200">
                    <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                        <span className="font-semibold">Hotel Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-white bg-transparent">
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[75%] p-2 px-3 rounded-lg text-sm ${msg.from === 'user'
                                        ? 'ml-auto bg-blue-100 text-right'
                                        : 'mr-auto bg-gray-200'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-2 border-t flex items-center gap-2 bg-white">
                        <input
                            className="flex-1 p-2 border rounded-xl text-sm outline-none focus:ring-0 focus:ring-blue-300"
                            placeholder="Ask something..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                            onClick={handleSend}
                        >
                            <FiSend size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
                >
                    <FiMessageSquare size={24} />
                </button>
            )}
        </div>
    );
}
