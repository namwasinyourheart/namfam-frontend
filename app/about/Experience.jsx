import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = ({ professionalExperience }) => {
  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-black via-gray-400 to-gray-200" />

      <div className="space-y-6">
        {professionalExperience.map((experience, index) => (
          <div key={index} className="relative group">
            <div className="absolute -left-5 top-5 w-3 h-3 rounded-full bg-black border-2 border-white shadow-md group-hover:scale-125 transition-transform duration-300" />

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 hover:shadow-md hover:border-gray-400 transition-all duration-300 group-hover:-translate-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-bold text-black">
                  {experience.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <Calendar size={14} />
                  {experience.duration}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1.5">
                <Briefcase size={14} />
                {experience.company}
              </p>
              <ul className="space-y-2">
                {experience.responsibilities.split(/\r?\n/).map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {responsibility.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
