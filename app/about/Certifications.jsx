import React from "react"
import './about.css'

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
                  <a 
                    href={certification.link}
                    className="block w-full h-full" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-xl font-semibold text-black">
                      {certification.title} <span className="font-normal text-lg text-gray-600"> issued by {certification.issued_by}</span>
                    </h3>
                    <h4 className="text-blue-600">{certification.date}</h4>
                  </a>

                </div>
              ))}
            </div>
        </section>
    )
}

export default Certifications