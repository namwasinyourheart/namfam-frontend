import React, { useState } from 'react';

import { Send } from "lucide-react";


const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="w-full border rounded-lg p-2"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-2"
        >
        <Send className="h-4 w-4" />
        {/* <SendIcon className="w-5 h-5" /> */}
        {/* <img src={sendIconPath} alt="Send" className="w-5 h-5" /> */}
      </button>
    </form>
  );
};

export default MessageInput;
