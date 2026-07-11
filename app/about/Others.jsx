import React from "react";
import { Sparkles } from "lucide-react";

const Others = ({ others }) => {
  const items = others.details.split(/\r?\n/).filter(s => s.trim());

  return (
    <div className="relative rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
      <div className="p-5 sm:p-8 pl-6 sm:pl-8">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black text-white shadow-md flex-shrink-0">
            <Sparkles size={22} />
          </div>
          <div className="flex-1">
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
