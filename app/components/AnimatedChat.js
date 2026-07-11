"use client";

const AnimatedChat = ({ isVisible, children }) => {
  return (
    <div
      className={`flex flex-col h-full max-h-[1000px] justify-center transition-all duration-300 ease-in-out origin-bottom-right overflow-hidden ${
        isVisible
          ? "w-full md:w-1/2 p-4 sm:p-10 pt-32 md:pt-40 opacity-100 scale-100"
          : "w-0 p-0 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedChat;
