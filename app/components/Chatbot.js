"use client";

import React, { useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatboxHeader from "./ChatboxHeader";
import { useChat } from "./FloatingChat";

const Chatbot = ({ onClose }) => {
  const {
    messages,
    isLoading,
    suggestions,
    handleSend,
    handleClear,
    handleSuggestionClick,
    clearNewFlag,
    clearAllNewFlags,
  } = useChat();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    clearAllNewFlags();
  }, []);

  return (
    <div className="shadow-lg border border-gray-200 rounded-lg h-full flex flex-col bg-white">
      <div className="flex-shrink-0">
        <ChatboxHeader onClear={handleClear} onClose={onClose} />
      </div>

      <div className="chatbox-content flex flex-col flex-grow h-0 overflow-hidden m-2 sm:m-4">
        <div
          ref={scrollContainerRef}
          className="overflow-auto scrollbar-hide flex-grow px-4"
        >
          <MessageList
            messages={messages}
            isLoading={isLoading}
            scrollRef={scrollContainerRef}
            clearNewFlag={clearNewFlag}
          />
        </div>

        <div className="bg-transparent flex flex-wrap gap-2 justify-center rounded-lg">
          {messages.length <= 1 && suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-2xl hover:bg-gray-200 border border-gray-200 text-sm font-semibold transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex-shrink-0 px-4 py-2">
          <MessageInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
