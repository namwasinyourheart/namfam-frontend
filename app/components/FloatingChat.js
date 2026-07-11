"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "./Chatbot";
import processMessage from "../api/processMessage";

export const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

const GREETING = "Hello! What do you want to know about Nam?";

const FloatingChat = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isExpanded, setIsExpanded] = useState(true);

  const [messages, setMessages] = useState([
    { text: GREETING, isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Nam's work experience?",
    "Nam's main skills?",
    "Nam's key projects?",
  ]);

  useEffect(() => {
    if (isHome) {
      setIsExpanded(true);
    }
  }, [isHome]);

  const toggleChat = () => setIsExpanded((prev) => !prev);

  const handleSend = async (message) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.isUser && last.text === message) return prev;
      return [...prev, { text: message, isUser: true }];
    });

    setIsLoading(true);
    try {
      const response = await processMessage(message);
      setMessages((prev) => [
        ...prev,
        { text: response, isUser: false, isNew: true },
      ]);
    } catch {
      setError("Failed to generate response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ text: GREETING, isUser: false }]);
    setSuggestions([
      "Nam's work experience?",
      "Nam's main skills?",
      "Nam's key projects?",
    ]);
  };

  const clearNewFlag = (index) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index && m.isNew ? { ...m, isNew: false } : m))
    );
  };

  const clearAllNewFlags = () => {
    setMessages((prev) =>
      prev.map((m) => (m.isNew ? { ...m, isNew: false } : m))
    );
  };

  const handleSuggestionClick = async (suggestion) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.isUser && last.text === suggestion) return prev;
      return [...prev, { text: suggestion, isUser: true }];
    });

    setIsLoading(true);
    try {
      const response = await processMessage(suggestion);
      setMessages((prev) => [
        ...prev,
        { text: response, isUser: false, isNew: true },
      ]);
    } catch {
      setError("Failed to generate response.");
    } finally {
      setIsLoading(false);
    }

    setSuggestions((prev) => prev.filter((s) => s !== suggestion));
  };

  const chatValue = {
    isExpanded,
    toggleChat,
    isHome,
    messages,
    isLoading,
    error,
    suggestions,
    handleSend,
    handleClear,
    handleSuggestionClick,
    clearNewFlag,
    clearAllNewFlags,
  };

  return (
    <ChatContext.Provider value={chatValue}>
      {children}

      {/* Other pages: floating panel + button */}
      {!isHome && (
        <>
          {isExpanded && (
            <div
              className="fixed inset-0 bg-black/20 z-[99] lg:hidden"
              onClick={toggleChat}
            />
          )}

          {/* Chat Panel */}
          <div
            className={`fixed z-[100] transition-all duration-300 ease-in-out ${
              isExpanded
                ? "bottom-0 right-0 sm:bottom-20 sm:right-6 sm:w-[420px] sm:h-[600px] h-[calc(100vh-3.5rem)] w-full sm:rounded-2xl sm:shadow-2xl sm:border sm:border-gray-200"
                : "bottom-20 right-4 sm:bottom-24 sm:right-6 w-0 h-0 opacity-0 pointer-events-none"
            }`}
          >
            {isExpanded && (
              <div className="h-full flex flex-col bg-white sm:rounded-2xl overflow-hidden">
                <div className="flex-1 min-h-0">
                  <Chatbot onClose={toggleChat} />
                </div>
              </div>
            )}
          </div>

        </>
      )}

      {/* Floating Button — all pages when collapsed */}
      {!isExpanded && (
        <button
          onClick={toggleChat}
          className={`fixed z-[101] flex items-center justify-center w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 ${
            isHome
              ? "bottom-20 right-6"
              : "bottom-20 right-4 sm:bottom-24 sm:right-6"
          }`}
        >
          <MessageCircle size={22} className="text-white" />
        </button>
      )}
    </ChatContext.Provider>
  );
};

export default FloatingChat;
