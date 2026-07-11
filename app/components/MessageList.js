import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const TypingIndicator = () => (
  <div className="flex items-start justify-start mb-2">
    <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-1">
      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full" style={{ animationDelay: '0s' }} />
      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full" style={{ animationDelay: '0.2s' }} />
      <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full" style={{ animationDelay: '0.4s' }} />
      <style>{`
        .typing-dot {
          animation: typingBounce 1.4s infinite ease-in-out;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  </div>
);

const TypewriterMessage = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    const speed = 20;
    const interval = setInterval(() => {
      indexRef.current++;
      if (indexRef.current <= text.length) {
        setDisplayedText(text.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <MarkdownContent text={displayedText} />
  );
};

const MarkdownContent = ({ text }) => (
  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-2 prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-inherit prose-img:rounded-lg">
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {text}
    </ReactMarkdown>
  </div>
);

const MessageList = ({ messages, isLoading, scrollRef, clearNewFlag }) => {
  const containerRef = useRef(null);
  const targetRef = scrollRef || containerRef;

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };

    const observer = new MutationObserver(scrollToBottom);
    observer.observe(el, { childList: true, subtree: true, characterData: true });

    scrollToBottom();

    return () => observer.disconnect();
  }, [messages, isLoading, targetRef]);

  return (
    <div ref={containerRef} className="message-list flex-grow mb-4 p-2">
      <div className="flex flex-col gap-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}
          >
            {msg.isUser ? (
              <div
                className="bg-blue-600 text-white rounded-lg px-3 py-2 text-sm max-w-[80vw]"
              >
                {msg.text}
              </div>
            ) : (
              <div
                className="bg-gray-100 rounded-lg border border-gray-200 px-3 py-2 text-sm max-w-[80vw]"
              >
                {msg.isNew ? (
                  <TypewriterMessage text={msg.text} onComplete={() => clearNewFlag?.(index)} />
                ) : (
                  <MarkdownContent text={msg.text} />
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};

export default MessageList;
