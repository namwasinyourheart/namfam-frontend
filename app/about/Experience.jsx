import React from 'react';

// Main Experience component with embedded ExperienceItem
const Experience = () => {
  // Dummy resume data
  const resume = {
    professional_experience: [
      {
        title: "Founder/Blogger",
        company: "Machine Learning Pulse Blog",
        duration: "Apr 2024 – Present",
        responsibilities: [
          "Regularly produce in-depth articles, tutorials, and case studies exploring advanced AI/machine learning concepts.",
          "Garnered 1,000 subscribers fanpage and cultivated a community of 1,000 active members."
        ]
      },
      {
        title: "Technology Specialist",
        company: "VINBIGDATA",
        duration: "Jul 2023 – Apr 2024",
        responsibilities: [
          "Participated in intensive AI training courses on AI/ML/CV/NLP concepts.",
          "Implemented capstone projects including aspect-based sentiment analysis and image captioning.",
          "Engaged in a challenging internship specializing in speaker recognition."
        ]
      }
    ]
  };

  // Subcomponent for individual experience items
  // const ExperienceItem = ({ title, company, duration, responsibilities, isLast }) => (
  //   <div className={`relative pl-8 pb-8 ${isLast ? 'pb-4' : ''}`}>
  //     {/* Timeline bar */}
  //     <div className={`absolute left-0 top-0 w-1 ${isLast ? 'h-full' : 'h-full'} bg-green-500`}>
  //       <div className="absolute left-0 top-0 w-4 h-4 -ml-1.5 rounded-full bg-red-500"></div>
  //     </div>

  //     {/* Experience content */}
  //     <div className="bg-white p-4 rounded-lg shadow-md">
  //       {/* <div className={`absolute left-5 top-0 w-1 h-full bg-green-500`}></div> */}
  //       <h3 className="text-xl font-bold">{title} <span className="font-normal text-lg text-gray-600">at {company}</span></h3>
  //       <p className="text-green-500 font-semibold mt-1">{duration}</p>
  //       <ul className="list-disc list-inside mt-2 text-gray-600">
  //       <div className={`absolute left-5 top-0 w-1 h-full bg-green-500`}></div>
  //         {responsibilities.map((item, index) => (
  //           <li key={index} className="mt-1">{item}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  const ExperienceItem = ({ title, company, duration, responsibilities, isLast }) => {
    return (
      <div className={`relative pl-8 pb-8 ${isLast ? 'pb-4' : ''}`}>
        {/* Parent container for flex layout */}
        <div className="flex">
        <div className={"absolute left-0 top-0 w-1 h-full bg-green-500"}></div>
          
          {/* Timeline bar */}
          <div className={`flex-shrink-0 mr-5 w-1 bg-green-500`}>
            <div className="w-4 h-4 -ml-1.5 rounded-full bg-red-500"></div>
          </div>
  
          {/* Experience content */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold">
              {title} <span className="font-normal text-lg text-gray-600">at {company}</span>
            </h3>
            <p className="text-green-500 font-semibold mt-1">{duration}</p>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {responsibilities.map((item, index) => (
                <li key={index} className="mt-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="experience-section py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-600 mb-8 text-center">EXPERIENCE</h2>
        <div className="max-w-3xl mx-auto">
          {resume.professional_experience.map((exp, index) => (
            <ExperienceItem 
              key={index} 
              {...exp} 
              // Check if this is the last item
              isLast={index === resume.professional_experience.length - 1} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
