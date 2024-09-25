import React from 'react';
import Experience from './Experience_css'
import TechnicalSkills from './TechnicalSkills';
import Education from './Education';
import Intro from './Intro'
import Certifications from './Certifications'
import Others from './Others'

const getAboutInfo = async () => {
  try {
      const response = await fetch('/api/about/');
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // Process the data as needed
      // Example: Displaying the experiences in a list
      const experiences = data.experiences;
      return experiences
      // experiences.forEach(exp => {
      //     console.log(`Position: ${exp.position}`);
      //     console.log(`Company: ${exp.company}`);
      //     console.log(`Start Date: ${exp.start_date}`);
      //     console.log(`End Date: ${exp.end_date}`);
      //     console.log(`Description: ${exp.description}`);
      //     console.log('---');
      // });
  } catch (error) {
      console.error('Error fetching about info:', error);
  }
};



const AboutPage = () => {
  // Dummy data
  const resume = {
    contact: {
      address: "Hai Ba Trung District, Hanoi",
      phone: "(+84)38 3508 351",
      email: "itsnamfam@gmail.com",
      github: "github.com/namwasinyourheart",
    },
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
      // Add more experiences as needed
    ],
    technical_skills: {
      machine_learning: ["Regression", "Decision Tree", "SVM", "Clustering", "Bagging/Boosting"],
    natural_language_processing: ["BERT", "T5", "LLMs Fine-tuning", "RAG", "Speaker Recognition/Verification"],
    languages_tools: ["Python", "SQL", "Javascript"],
    libraries_frameworks: ["Tensorflow", "Keras", "PyTorch", "Scikit-learn", "Docker", "FastAPI", "Git"],
      data_science: ["Statistical Analysis", "Data Visualization"],
      // machine_learning: ["Regression", "Decision Tree", "Ensemble Methods"],
      // natural_language_processing: ["CNN", "RNN/LSTM", "BERT"],
      speech_processing: ["Speaker Verification", "Text-to-Speech"],
      mlops: ["Docker", "FastAPI", "RestAPI"],
      // languages_tools: ["Python", "SQL", "Git"],
      // libraries_frameworks: ["Tensorflow", "Keras", "PyTorch"]
    },
    education: {
      institution: "Hanoi University of Science and Technology",
      degree: "Bachelor in Computer Science",
      duration: "Fall 2018 – Present",
      cumulative_cpa: "3.22/4.0",
      graduation_thesis: {
        title: "Chatbot Question Answering",
        grade: "9.5/10"
      }
    },
    side_projects: [
      {
        title: "Voice Cloning",
        details: "Developed a voice assistant using IBM Watson and GPT-3. Integrated IBM Watson's Speech-to-Text with GPT-3 for intelligent responses."
      },
      {
        title: "Real-Time Stock Investing Advisor",
        details: "Built pipelines for feature extraction and inference using Bytewax, Qdrant, and LLMs."
      }
      // Add more projects as needed
    ],
    certifications: [
      { title: "DeepLearning.AI Generative AI with Large Language Models", date: "Jul 2023" },
      { title: "Microsoft Certified: Azure AI Fundamentals", date: "Jun 2023" }
    ],
    others: {
      english: "TOEIC certificate with score 795 - issued by IIG Mar 2023",
      chinese: "HSK …",
      activities: "Runner-up Iron Team"
    }
  };

  return (
    // <div style={{ backgroundColor: '#4a90e2' }}>
      <div 
      // style={{ backgroundColor: '#4a90e2' }} 
      className="px-4 py-8 w-2/3 mx-auto p-6">
        <h1
          style={{ fontFamily: "Proxima Nova Bold, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          className="text-4xl font-bold mb-4 text-center"
        >
          About
        </h1>

        <p className="mb-8 text-center">
        Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology
        </p>


      <div className=' bg-white shadow-md'>
        <Intro/>
      </div>

      <div className='bg-white shadow-md'>
        <Experience professionalExperience={resume.professional_experience}/>
      </div>

      <div className="bg-white shadow-md">
        <TechnicalSkills resume={resume} />
      </div>

      <div className='bg-white shadow-md'>
        <Education education={resume.education} />
      </div>

      <div className='bg-white shadow-md'>
        <Certifications certifications={resume.certifications}></Certifications>
      </div>

      <div className='bg-white shadow-md'>
        <Others others={resume.others}></Others>
      </div>

      </div>
    // </div>
  );
};

export default AboutPage;
