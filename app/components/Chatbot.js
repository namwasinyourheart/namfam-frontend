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
  const [isTypingEffectActive, setIsTypingEffectActive] = useState(true);
  const typingIntervalRef = useRef(null);
  const messageEndRef = useRef(null); // Ref for scrolling

  const initialMessageText = "Hello! What do you want to know about Nam?";

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
    } else {
      startTypingLoop();
    }

    return () => clearInterval(typingIntervalRef.current);
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const startTypingLoop = () => {
    const typingDuration = 50;
    let index = 0;

    typingIntervalRef.current = setInterval(() => {
      if (!isTypingEffectActive) {
        clearInterval(typingIntervalRef.current);
        return;
      }

      if (index < initialMessageText.length) {
        setMessages([{ text: initialMessageText.slice(0, index + 1), isUser: false }]);
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        setTimeout(() => {
          index = 0;
          startTypingLoop();
        }, 1000);
      }
    }, typingDuration);
  };

  const stopTypingEffectAndShowFullMessage = () => {
    setIsTypingEffectActive(false);
    clearInterval(typingIntervalRef.current);
    setMessages(prevMessages => {
      const fullInitialMessage = { text: initialMessageText, isUser: false };
      if (prevMessages.length === 0 || (prevMessages[0].text !== initialMessageText)) {
        return [fullInitialMessage];
      }
      return prevMessages;
    });
  };

  const handleSend = async (message) => {
    stopTypingEffectAndShowFullMessage();

    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage && lastMessage.isUser && lastMessage.text === message) {
        return newMessages;
      }

      return [
        ...newMessages,
        { text: message, isUser: true }
      ];
    });

    try {
      const response = await processMessage(message);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: response, isUser: false }
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
    setMessages([{ text: initialMessageText, isUser: false }]);
    setSuggestions([
      "Nam's work experience?",
      "Nam's main skills?",
      "Nam's key projects?",
    ]);
    setIsTypingEffectActive(true);
    startTypingLoop();
  };

  const handleSuggestionClick = async (suggestion) => {
    stopTypingEffectAndShowFullMessage();

    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage && lastMessage.isUser && lastMessage.text === suggestion) {
        return newMessages;
      }

      return [
        ...newMessages,
        { text: suggestion, isUser: true }
      ];
    });

    try {
      const response = await processMessage(suggestion);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: response, isUser: false }
      ]);
    } catch (error) {
      setError('Failed to generate response.');
    }

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
          {/* This div will help in auto-scrolling */}
          <div ref={messageEndRef} />
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
