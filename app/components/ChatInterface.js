// components/ChatInterface.js
'use client'; 
import { useState } from 'react';


export default function ChatInterface() {
  const [messages, setMessages] = useState([{ text: 'Hello! How can I assist you today?' }]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, user: true }]);

    // Simulate a response from the chatbot
    setTimeout(() => {
      setMessages([...messages, { text: input, user: true }, { text: 'Thank you for your message!' }]);
      setInput('');
    }, 1000);
  };

  return (
    <div className="w-full md:w-80 bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${msg.user ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="border-t border-gray-200 p-2 flex-1"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
