import React from 'react';
import "./TechnicalSkills.css"
import { BrainCircuitIcon, MessageSquareIcon, CodeIcon, WrenchIcon, LinkedinIcon, GithubIcon, TwitterIcon } from 'lucide-react';

const TechnicalSkills = () => {
  return (
    <div className="technical-skills">
      {/* <div className="expertise">EXPERTISE</div> */}
      <h2 className="title">TECHNICAL SKILLS</h2>
      <div className="content">
        <div className="skills-container">
          <div className="skill-item">
            <div className="skill-icon"><BrainCircuitIcon /></div>
            <div className="skill-content">
              <h3>Machine Learning</h3>
              <p>Regression, Decision Tree, SVM, Clustering, Bagging/Boosting</p>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-icon"><MessageSquareIcon /></div>
            <div className="skill-content">
              <h3>NLP/Speech Processing</h3>
              <p>BERT, T5, LLMs Fine-tuning, RAG, Speaker Recognition/Verification</p>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-icon"><CodeIcon /></div>
            <div className="skill-content">
              <h3>Languages</h3>
              <p>Python, SQL, Javascript</p>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-icon"><WrenchIcon /></div>
            <div className="skill-content">
              <h3>Frameworks/Tools</h3>
              <p>Tensorflow/Keras, PyTorch, Scikit-learn, WandB, Langchain, CrewAI, Streamlit/ReactJS, Django/FastAPI, Git, Docker</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="social-links">
        <span>Follow Me On:</span>
        <a href="#" className="social-icon"><LinkedinIcon /></a>
        <a href="#" className="social-icon"><GithubIcon /></a>
        <a href="#" className="social-icon"><TwitterIcon /></a>
      </div> */}
    </div>
  );
};

export default TechnicalSkills;