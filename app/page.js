"use client";

import Introduction from './components/Introduction';
import Chatbot from './components/Chatbot';
import AnimatedChat from './components/AnimatedChat';
import { useChat } from './components/FloatingChat';

export default function Home() {
  const { isExpanded, toggleChat } = useChat();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full gap-4 w-full px-4 sm:px-6">
      <Introduction />

      <AnimatedChat isVisible={isExpanded}>
        <Chatbot onClose={toggleChat} />
      </AnimatedChat>
    </div>
  );
}
