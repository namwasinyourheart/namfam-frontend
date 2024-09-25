import React from 'react';
import './TechnicalSkills.css';

const Education = ({ education }) => {
  return (
    <section className="section">
      <h2 className="title">EDUCATION</h2>

      <div className="relative pl-6">
        {/* Timeline bar */}
        <div className="absolute left-1.5 top-0 w-1 h-full bg-green-600"></div>

        {/* Education items */}
        <div key={education.institution} className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer">
          <div className="absolute left-[-25px] top-[-1px] w-4 h-4 bg-green-600 border-2 border-white rounded-full"></div>

          <h3 className="text-xl font-semibold text-black">
            {education.degree} <span className="font-normal text-lg text-gray-600">at {education.institution}</span>
          </h3>
          <h4 className="text-green-600">{education.duration}</h4>
          {/* <p className="text-gray-600">Cumulative CPA: {education.cumulative_cpa}</p> */}
          {/* <h5 className="text-gray-600 font-semibold">Graduation Thesis:</h5> */}
          {/* <p className="text-gray-600">{education.graduation_thesis.title} (Grade: {education.graduation_thesis.grade})</p> */}
        </div>
      </div>
    </section>
  );
};

export default Education;
