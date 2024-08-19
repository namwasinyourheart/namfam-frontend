"use client"

import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatboxHeader from './ChatboxHeader';

import processMessage from '../api/processMessage'

const Chatbot = ({ onSaveConversation, selectedConversation }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const [suggestions, setSuggestions] = useState([
    "Nam's work experience?",
    "Nam's main skills?",
    "Nam's key projects?",
  ]);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
    } else {
      setMessages([{ text: "Hello! What do you want to know about Nam?", isUser: false }]); // Initial bot message
    }
  }, [selectedConversation]);

  // const handleSend = (message) => {
  //   setMessages([...messages, { text: message, isUser: true }]);
  //   processMessage(message);
  // };

  const handleSend = async (message) => {
    setMessages([...messages, { text: message, isUser: true }]);

    try {
      const response = await processMessage(message); // Call the API function
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, isUser: false }, // Use the correct field from the response
      ]);
    } catch (error) {
      setError('Failed to generate response.');
    }
  };



  const handleSave = () => {
    if (selectedConversation) {
      onSaveConversation({ ...selectedConversation, messages });
    }
  };

  const handleClear = () => {
    // setMessages([]);
    setMessages([{ text: "Hello! What do you want to know about Nam?", isUser: false }]); 
    setSuggestions([
        "Nam's work experience?",
        "Nam's main skills?",
        "Nam's key projects?",
    ])
  };


  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

// //   return (
// //     <div className="chatbox-header border rounded-lg h-full flex flex-col bg-white relative">
// //         <div className="flex-shrink-0">
// //             <ChatboxHeader onClear={handleClear} />
// //         </div>
        
// //         <div className="chatbox-content flex flex-col flex-grow h-0 overflow-hidden m-4">
// //             <div className="overflow-auto flex-grow px-4 relative">
// //                 <MessageList messages={messages} />
// //             </div>
// //             <div className="relative px-4 py-2">
// //                 {/* Suggestion Buttons */}
// //                 <div className="flex flex-wrap gap-2 mb-2 absolute left-0 right-0">
// //                     {suggestions.map((suggestion, index) => (
// //                         <button 
// //                             key={index} 
// //                             onClick={() => handleSuggestionClick(suggestion)} 
// //                             className='bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300'
// //                         >
// //                             {suggestion}
// //                         </button>
// //                     ))}
// //                 </div>
// //                 {/* Message Input */}
// //                 <MessageInput onSend={handleSend} />
// //             </div>
// //         </div>
// //     </div>
// //   );
// };

// export default Chatbot;

  return (
    <div className="shadow-lg chatbox-header border rounded-lg h-full flex flex-col bg-white">
        <div className="flex-shrink-0">
        <ChatboxHeader onClear={handleClear} />
            {/* <ChatboxHeader 
                onClear={handleClear} 
                suggestions={suggestions} 
                onSuggestionClick={handleSuggestionClick} 
            /> */}
        </div>
        
        <div className="chatbox-content flex flex-col flex-grow h-0 overflow-hidden m-4">
            <div className="overflow-auto flex-grow px-4">
                <MessageList messages={messages} />
            </div>

            <div className="bg-transparent flex flex-wrap gap-2 justify-center rounded-lg">
                    {suggestions.map((suggestion, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleSuggestionClick(suggestion)} 
                            className='bg-white-200 text-black px-2 py-1 rounded-2xl hover:bg-gray-300 border text-sm font-semibold'
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

            <div className="flex-shrink-0 px-4 py-2">
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    </div>
  );
};

export default Chatbot;
