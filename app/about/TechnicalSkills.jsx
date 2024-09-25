
// import React from 'react';
// import './TechnicalSkills.css';
// import { BrainCircuitIcon, MessageSquareIcon, CodeIcon, WrenchIcon } from 'lucide-react';


import React from 'react';
import "./TechnicalSkills.css";
import { BrainCircuitIcon, MessageSquareIcon, CodeIcon, WrenchIcon } from 'lucide-react';

const TechnicalSkills = ({ resume }) => {
  return (
    <div className="technical-skills">
      <h2 className="title">TECHNICAL SKILLS</h2>
      <div className="content">
        <div className="skills-container">
          {/* Machine Learning Section */}
          {resume.technical_skills.machine_learning && (
            <div className="skill-item">
              <div className="skill-icon">
                <BrainCircuitIcon />
              </div>
              <div className="skill-content">
                <h3>Machine Learning</h3>
                <p>{resume.technical_skills.machine_learning.join(', ')}</p>
              </div>
            </div>
          )}

          {/* NLP/Speech Processing Section */}
          {resume.technical_skills.natural_language_processing && (
            <div className="skill-item">
              <div className="skill-icon">
                <MessageSquareIcon />
              </div>
              <div className="skill-content">
                <h3>NLP/Speech Processing</h3>
                <p>{resume.technical_skills.natural_language_processing.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Languages Section */}
          {resume.technical_skills.languages_tools && (
            <div className="skill-item">
              <div className="skill-icon">
                <CodeIcon />
              </div>
              <div className="skill-content">
                <h3>Languages</h3>
                <p>{resume.technical_skills.languages_tools.join(', ')}</p>
              </div>
            </div>
          )}

          {/* Frameworks/Tools Section */}
          {resume.technical_skills.libraries_frameworks && (
            <div className="skill-item">
              <div className="skill-icon">
                <WrenchIcon />
              </div>
              <div className="skill-content">
                <h3>Frameworks/Tools</h3>
                <p>{resume.technical_skills.libraries_frameworks.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;


  // Dummy data
//   const resume = {
//     contact: {
//       address: "Hai Ba Trung District, Hanoi",
//       phone: "(+84)38 3508 351",
//       email: "itsnamfam@gmail.com",
//       github: "github.com/namwasinyourheart",
//     },
//     professional_experience: [
//       {
//         title: "Founder/Blogger",
//         company: "Machine Learning Pulse Blog",
//         duration: "Apr 2024 – Present",
//         responsibilities: [
//           "Regularly produce in-depth articles, tutorials, and case studies exploring advanced AI/machine learning concepts.",
//           "Garnered 1,000 subscribers fanpage and cultivated a community of 1,000 active members."
//         ]
//       },
//       {
//         title: "Technology Specialist",
//         company: "VINBIGDATA",
//         duration: "Jul 2023 – Apr 2024",
//         responsibilities: [
//           "Participated in intensive AI training courses on AI/ML/CV/NLP concepts.",
//           "Implemented capstone projects including aspect-based sentiment analysis and image captioning.",
//           "Engaged in a challenging internship specializing in speaker recognition."
//         ]
//       }
//       // Add more experiences as needed
//     ],
//     technical_skills: {
//       data_science: ["Statistical Analysis", "Data Visualization"],
//       machine_learning: ["Regression", "Decision Tree", "Ensemble Methods"],
//       natural_language_processing: ["CNN", "RNN/LSTM", "BERT"],
//       speech_processing: ["Speaker Verification", "Text-to-Speech"],
//       mlops: ["Docker", "FastAPI", "RestAPI"],
//       languages_tools: ["Python", "SQL", "Git"],
//       libraries_frameworks: ["Tensorflow", "Keras", "PyTorch"]
//     },
//     education: {
//       institution: "Hanoi University of Science and Technology",
//       degree: "Bachelor in Computer Science",
//       duration: "Fall 2018 – Present",
//       cumulative_cpa: "3.22/4.0",
//       graduation_thesis: {
//         title: "Chatbot Question Answering",
//         grade: "9.5/10"
//       }
//     },
//     side_projects: [
//       {
//         title: "Voice Cloning",
//         details: "Developed a voice assistant using IBM Watson and GPT-3. Integrated IBM Watson's Speech-to-Text with GPT-3 for intelligent responses."
//       },
//       {
//         title: "Real-Time Stock Investing Advisor",
//         details: "Built pipelines for feature extraction and inference using Bytewax, Qdrant, and LLMs."
//       }
//       // Add more projects as needed
//     ],
//     certifications: [
//       { title: "DeepLearning.AI Generative AI with Large Language Models", date: "Jul 2023" },
//       { title: "Microsoft Certified: Azure AI Fundamentals", date: "Jun 2023" }
//     ],
//     additional_information: {
//       english: "TOEIC certificate with score 795 - issued by IIG Mar 2023",
//       chinese: "HSK …",
//       activities: "Runner-up Iron Team"
//     }
//   };


//   const TechnicalSkills = ({ resume }) => {
//     return (
//       <div className="technical-skills">
//         <h2 className="title">TECHNICAL SKILLS</h2>
//         <div className="content">
//           <div className="skills-container">
            
//             {/* Machine Learning Section */}
//             <div className="skill-item">
//               <div className="skill-icon">
//                 <BrainCircuitIcon />
//               </div>
//               <div className="skill-content">
//                 <h3>Machine Learning</h3>
//                 <p>Regression, Decision Tree, SVM, Clustering, Bagging/Boosting, CNN, RNN/LSTM, BERT</p>
//               </div>
//             </div>
  
//             {/* NLP/Speech Processing Section */}
//             <div className="skill-item">
//               <div className="skill-icon">
//                 <MessageSquareIcon />
//               </div>
//               <div className="skill-content">
//                 <h3>NLP/Speech Processing</h3>
//                 <p>BERT, T5, LLMs Fine-tuning, RAG, Speaker Recognition/Verification, Text-to-Speech</p>
//               </div>
//             </div>
  
//             {/* Languages Section */}
//             <div className="skill-item">
//               <div className="skill-icon">
//                 <CodeIcon />
//               </div>
//               <div className="skill-content">
//                 <h3>Languages</h3>
//                 <p>Python, SQL, JavaScript</p>
//               </div>
//             </div>
  
//             {/* Frameworks/Tools Section */}
//             <div className="skill-item">
//               <div className="skill-icon">
//                 <WrenchIcon />
//               </div>
//               <div className="skill-content">
//                 <h3>Frameworks/Tools</h3>
//                 <p>Tensorflow, Keras, PyTorch, Scikit-learn, Docker, FastAPI, Git, WandB</p>
//               </div>
//             </div>
  
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default TechnicalSkills;
  