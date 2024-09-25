import React from "react"
import './TechnicalSkills.css'

const Certifications = ({certifications}) => {
    return (
        <section className="section">
            <h2 className="title">CERTIFICATIONS</h2>
            <div className="relative pl-6">
            {certifications.map((certification, index) => (
          <div 
            key={index} 
            className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer"
          >
            {/* <div className="absolute left-[-25px] top-[-1px] w-4 h-4 bg-green-600 border-2 border-white rounded-full"></div> */}

            <h3 className="text-xl font-semibold text-black">
              {certification.title}
            </h3>
            <h4 className="text-green-600">Date: {certification.date}</h4>
          </div>
        ))}
            </div>
        </section>
    )
}

export default Certifications