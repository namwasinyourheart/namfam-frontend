import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = ({ education }) => {
  return (
    <div className="relative rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
      <div className="p-5 sm:p-8 pl-6 sm:pl-8">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black text-white shadow-md flex-shrink-0">
            <GraduationCap size={22} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-black mb-1">
              {education.degree}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {education.institution}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <Calendar size={14} />
              {education.duration}
            </div>
            {education.cumulative_cpa && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg border border-gray-200">
                GPA: {education.cumulative_cpa}
              </div>
            )}
            {education.graduation_thesis && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Graduation Thesis</p>
                <p className="text-sm text-gray-800 font-medium">{education.graduation_thesis.title}</p>
                <p className="text-xs text-black font-semibold mt-1">Grade: {education.graduation_thesis.grade}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
