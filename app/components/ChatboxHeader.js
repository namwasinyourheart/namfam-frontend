import React from 'react';

const ChatboxHeader = ({ onClear, suggestions = [], onSuggestionClick }) => {
    return (
        <div style={{ backgroundColor: "#f0f6fb", width: "100%" }} className='flex flex-row rounded-t-lg justify-between items-center p-4 h-20'>
            <div className='info font-semibold text-2xl'>
                Nam's Assistant
            </div>
            <div className='flex gap-4'>
                <button 
                    onClick={onClear} 
                    className='bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700'
                >
                    New chat
                </button>
                {/* <div className='button'>
                    Button
                </div> */}
            </div>

            {/* <div className='mt-4 flex flex-wrap gap-2'>
                {suggestions.map((suggestion, index) => (
                    <button 
                        key={index} 
                        onClick={() => onSuggestionClick(suggestion)} 
                        className='bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300'
                    >
                        {suggestion}
                    </button>
                ))}
            </div> */}

        </div>
    );
};

export default ChatboxHeader;
