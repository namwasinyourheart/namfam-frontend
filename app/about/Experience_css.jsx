import React from 'react';
import './TechnicalSkills.css'
const Experience = ({ professionalExperience }) => {
  return (
    <section className="section">
      <h2 className="title">EXPERIENCE</h2>
      {/* <header className="text-red-500 text-lg font-semibold mb-5">
      <h2 className="title">TECHNICAL SKILLS</h2>
      </header> */}

      <div className="relative pl-6 ">
        {/* Timeline bar */}
        <div className="absolute left-1.5 top-0 w-1 h-full bg-green-600"></div>

        {/* Timeline items */}
        {professionalExperience.map((experience, index) => (
          <div key={index} className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer">
            <div className="absolute left-[-25px] top-[-1px] w-4 h-4 bg-green-600 border-2 border-white rounded-full"></div>
            
            {/* {experience.title} <span className="font-normal text-lg text-gray-600">at {experience.company}</span> */}
            <h3 className="text-xl font-semibold text-black">
              {experience.title} <span className="font-normal text-lg text-gray-600">at {experience.company}</span>
            </h3>
            
            {/* <h3 className="text-xl font-semibold py-2 text-gray-800">{experience.title} at {experience.company}</h3> */}
            <h4 className="text-green-600">{experience.duration}</h4>
            <ul className="text-gray-600 list-disc pl-5">
              {experience.responsibilities.map((responsibility, idx) => (
                <li key={idx}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;