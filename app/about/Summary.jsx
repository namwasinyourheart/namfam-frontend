import React from "react";
import { CheckCircle2 } from "lucide-react";

const Summary = ({ summary }) => {
  const items = summary.split(/\r?\n/).filter(s => s.trim());

  return (
    <div className="relative rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
      <div className="p-5 sm:p-8 pl-6 sm:pl-8">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
              <CheckCircle2 size={18} className="text-black mt-0.5 flex-shrink-0" />
              <span>{item.trim()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;
