// components/ChatPopup.js

'use client'; // Ensure this component is rendered on the client side

import { useState } from 'react';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

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
    <div className="fixed bottom-4 right-4">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
      
      {/* Chat popup window */}
      {isOpen && (
        <div className="w-80 h-80 bg-white shadow-lg rounded-lg mt-2 p-4 absolute bottom-0 right-0 flex flex-col">
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 bg-gray-300 text-gray-800 rounded-full p-1 hover:bg-gray-400 focus:outline-none"
          >
            &times; {/* Close button */}
          </button>
          <div className="flex-1 overflow-auto mb-2">
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${msg.user ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
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
      )}
    </div>
  );
}
