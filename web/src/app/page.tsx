'use client';
import { useState } from "react";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [prompt, setPrompt] = useState("");

  const sendMessage = async () => {
    if (!prompt) return;

    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = await remark().use(html).process(data.answer);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: content.toString() },
        ]);
      } else {
        console.error("Failed to fetch response");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-0">
      <div className="bg-white shadow-xl w-full h-full max-w-none flex flex-col">
        <div className="p-5 bg-orange-500 flex items-center justify-between text-white">
          <h1 className="text-xl font-bold">Cloudflare Chat</h1>
          <Image
            src="https://developers.cloudflare.com/_astro/logo.p_ySeMR1.svg"
            alt="Cloudflare Logo"
            width={50}
            height={50}
            className="bg-white rounded-full"
          />
        </div>
        <div className="flex-grow p-4 overflow-y-auto border-t border-b border-black">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message mb-3 ${msg.role}`}>
                <div className={`p-3 rounded ${msg.role === "user" ? "bg-orange-100 text-black" : "bg-black text-white"}`}>
                  {msg.role === "assistant" ? (
                    <div
                      className="prose prose-invert"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap">{msg.content}</pre> // Use pre to keep formatting
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="input flex items-center border-t p-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 border p-3 text-black rounded-l shadow-inner"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-orange-500 text-white px-6 py-3 rounded-r hover:bg-orange-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Chat />
    </div>
  );
}