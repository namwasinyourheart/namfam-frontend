import React from "react";
import './about.css'


const Others = ({others}) => {
    return (
        <section className="section">
            <h2 className="title">
                OTHERS
            </h2>
            <div className="relative pl-6">

                <div className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer pl-8">

                    <ul className="list-disc">
                        {others.details.split('\r\n').map((item, index) => (
                            <li key={index}>{item}</li>
                            
                        ))}
                    </ul>
                </div>
            </div>


        </section>
    )
};

export default Others

// const Others = ({others}) => {
//     return (
//         <section className="section">
//             <h2 className="title">OTHERS</h2>
//             <div className="relative pl-6">
//                 <div className="relative mx-auto rounded-lg shadow-md bg-white border border-gray-200 p-5 mb-5 transition duration-300 hover:shadow-lg cursor-pointer">
//                     {/* {Object.entries(others).map(([key, value], index) => (
//                         value && (  // Only render if the value exists
//                             <p key={index} className="mb-2">
//                                 <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
//                             </p>
//                         )
//                     ))} */}

//                     <ul className="list-disc">
//                         {others.details.split('\r\n').map((item, index) => (
//                             <li key={index}>{item}</li>
                            
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//             {/* <div className="shadow-md">
//                 <p className="mb-2"><strong>English:</strong> {others.english}</p>
//                 <p className="mb-2"><strong>Chinese:</strong> {others.chinese}</p>
//                 <p><strong>Activities:</strong> {others.activities}</p>
//             </div> */}
//         </section>
//     )
// };

// export default Others


// const Others = ({others}) => {
//     return (
//         <section className="section">
//             <h2 className="title">OTHERS</h2>
//             <div className="shadow-md">
//                 <p className="mb-2"><strong>English:</strong> {others.english}</p>
//                 <p className="mb-2"><strong>Chinese:</strong> {others.chinese}</p>
//                 <p><strong>Activities:</strong> {others.activities}</p>
//             </div>
//         </section>
//     )
// };

// export default Others