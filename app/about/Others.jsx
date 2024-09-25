import React from "react";
import './TechnicalSkills.css'

const Others = ({others}) => {
    return (
        <section className="section">
            <h2 className="title">OTHERS</h2>
            <p className="mb-2"><strong>English:</strong> {others.english}</p>
            <p className="mb-2"><strong>Chinese:</strong> {others.chinese}</p>
            <p><strong>Activities:</strong> {others.activities}</p>
        </section>
    )
};

export default Others