import React from 'react';
import ReactMarkdown from 'react-markdown';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list flex-grow mb-4 p-2 ">
      <div className="flex flex-col gap-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`flex items-center ${msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-lg border ${msg.isUser ? 'border-gray-300' : 'border-blue-300'}`}
              style={{ padding: '8px 12px', fontSize: '14px', maxWidth: '500px'}}
            >
              <ReactMarkdown className='text-md'>
                {/* <span className="text-md">{msg.text}</span> */}
                {msg.text}
              </ReactMarkdown>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
