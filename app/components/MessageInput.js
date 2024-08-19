import React, { useState } from 'react';
// import { ReactComponent as SendIcon } from '../../assets/send-button.svg';
import sendIconPath from '../../assets/send-button.svg';


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
        className="w-full border rounded-l-lg p-2"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
        Send
        {/* <SendIcon className="w-5 h-5" /> */}
        {/* <img src={sendIconPath} alt="Send" className="w-5 h-5" /> */}
      </button>
    </form>
  );
};

export default MessageInput;
