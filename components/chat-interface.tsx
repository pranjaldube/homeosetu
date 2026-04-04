"use client"

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "bot";
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I am the Homeosetu AI assistant. How can I help you regarding homeopathic remedies today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I ran into an error: " + (data.error || "Unknown error") }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Sorry, something went wrong fetching the response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 z-50 flex items-center justify-center h-14 w-14"
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden" style={{ height: "500px" }}>
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold text-sm">Homeosetu AI</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 focus:outline-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && (
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-purple-600" />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.role === "user" ? "bg-purple-600 text-white rounded-br-none" : "bg-white border shadow-sm text-gray-800 rounded-bl-none"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={14} className="text-purple-600" />
            </div>
            <div className="p-3 rounded-2xl bg-white border shadow-sm text-gray-800 rounded-bl-none flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-purple-600" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-white flex gap-2 w-full">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about remedies..."
          className="flex-1 focus-visible:ring-purple-600 rounded-full bg-gray-50"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          size="icon" 
          className="bg-purple-600 hover:bg-purple-700 rounded-full flex-shrink-0 w-10 h-10 p-0"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
