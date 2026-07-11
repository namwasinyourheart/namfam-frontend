import React from 'react';
import { X } from 'lucide-react';

const ChatboxHeader = ({ onClear, onClose }) => {
    return (
        <div className="w-full flex flex-row rounded-t-lg justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
            <div>
                <div className="font-semibold text-xl sm:text-2xl text-black">
                    Vee
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Nam&apos;s AI Assistant</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onClear}
                    className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    New chat
                </button>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Close chat"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatboxHeader;
