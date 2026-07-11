import React from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";

const Certifications = ({ certifications }) => {
  return (
    <div className="space-y-4">
      {certifications.map((certification, index) => (
        <a
          key={index}
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative rounded-2xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6 hover:shadow-md hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
              <Award size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-black group-hover:text-gray-600 transition-colors leading-snug">
                {certification.title}
              </h3>
              {certification.issued_by && (
                <p className="text-sm text-gray-500 mt-1">issued by {certification.issued_by}</p>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium mt-2">
                <Calendar size={14} />
                {certification.date}
              </div>
            </div>
            <ExternalLink size={16} className="text-gray-300 group-hover:text-black transition-colors flex-shrink-0 mt-1" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default Certifications;
