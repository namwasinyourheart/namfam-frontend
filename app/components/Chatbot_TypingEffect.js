"use client";

import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatboxHeader from './ChatboxHeader';
import processMessage from '../api/processMessage';

const Chatbot = ({ onSaveConversation, selectedConversation }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([
    "Nam's work experience?",
    "Nam's main skills?",
    "Nam's key projects?",
  ]);
  const [isTypingEffectActive, setIsTypingEffectActive] = useState(true); // New state for typing effect
  const typingIntervalRef = useRef(null); // Ref to store typing interval

  const initialMessageText = "Hello! What do you want to know about Nam?";

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
    } else {
      startTypingLoop();
    }

    return () => clearInterval(typingIntervalRef.current); // Cleanup interval on unmount
  }, [selectedConversation]);

  const startTypingLoop = () => {
    const typingDuration = 100; // Duration between each character in ms
    let index = 0;

    typingIntervalRef.current = setInterval(() => {
      if (!isTypingEffectActive) {
        clearInterval(typingIntervalRef.current);
        setMessages([{ text: initialMessageText, isUser: false }]); // Show full message
        return;
      }

      if (index < initialMessageText.length) {
        setMessages([{ text: initialMessageText.slice(0, index + 1), isUser: false }]);
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        setTimeout(() => {
          index = 0;
          const resetTyping = setInterval(() => {
            if (!isTypingEffectActive) {
              clearInterval(resetTyping);
              setMessages([{ text: initialMessageText, isUser: false }]); // Show full message
              return;
            }

            if (index < initialMessageText.length) {
              setMessages([{ text: initialMessageText.slice(0, index + 1), isUser: false }]);
              index++;
            } else {
              clearInterval(resetTyping);
              setMessages([{ text: initialMessageText, isUser: false }]); // Finalize the message
              startTypingLoop();
            }
          }, typingDuration);
        }, 1000); // Wait for a second before restarting the typing effect
      }
    }, typingDuration);
  };

  const handleSend = async (message) => {
    setIsTypingEffectActive(false); // Disable typing effect
    clearInterval(typingIntervalRef.current); // Clear the typing interval

    // Display full initial message immediately
    setMessages([{ text: initialMessageText, isUser: false }, { text: message, isUser: true }]);

    try {
      const response = await processMessage(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, isUser: false },
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
    setMessages([{ text: "Hello! What do you want to know about Nam?", isUser: false }]);
    setSuggestions([
      "Nam's work experience?",
      "Nam's main skills?",
      "Nam's key projects?",
    ]);
    setIsTypingEffectActive(true); // Re-enable typing effect
    startTypingLoop(); // Restart typing loop
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  return (
    <div className="shadow-lg chatbox-header border rounded-lg h-full flex flex-col bg-white">
      <div className="flex-shrink-0">
        <ChatboxHeader onClear={handleClear} />
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
