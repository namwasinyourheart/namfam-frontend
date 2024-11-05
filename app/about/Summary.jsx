import React from "react";
import './about.css'

const Summary = ({summary}) => {
    return (
        <section className="section">
            <h2 className="title">
                SUMMARY
            </h2>
            <div className="relative pl-6">

                <div className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer pl-8">

                    <ul className="list-disc">
                        {summary.split('\r\n').map((item, index) => (
                            <li key={index}>{item}</li>
                            
                        ))}
                    </ul>
                </div>
            </div>


        </section>
    )
};

export default Summary