import React from 'react';
import {
  BrainCircuit,
  MessageSquare,
  Code,
  Wrench,
  Settings2,
  Cloud,
  BarChart3,
  Mic,
} from 'lucide-react';

const categoryConfig = {
  "Machine Learning": { icon: BrainCircuit },
  "NLP": { icon: MessageSquare },
  "Languages": { icon: Code },
  "Framework": { icon: Wrench },
  "MLOps": { icon: Settings2 },
  "Cloud": { icon: Cloud },
  "Data": { icon: BarChart3 },
  "Speech": { icon: Mic },
};

const getConfig = (category) => {
  for (const [key, config] of Object.entries(categoryConfig)) {
    if (category.includes(key)) return config;
  }
  return categoryConfig["Languages"];
};

const TechnicalSkills = ({ technicalSkills }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {technicalSkills && technicalSkills.map((skill) => {
        const config = getConfig(skill.category);
        const Icon = config.icon;
        const tags = skill.skill.split(',').map(s => s.trim()).filter(Boolean);

        return (
          <div
            key={skill.id}
            className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-black text-white shadow-sm">
                <Icon size={18} />
              </div>
              <h3 className="font-bold text-sm text-black">
                {skill.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechnicalSkills;
