"use client"

// import React from 'react';
import Experience from './Experience_css'
import TechnicalSkills from './TechnicalSkills';
import Education from './Education';
import Intro from './Intro'
import Certifications from './Certifications'
import Others from './Others'
import Summary from './Summary';

import React, { useState, useEffect } from 'react';

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
    summary: [
      "About 1 year of experience in AI engineer, focusing on speaker recognition/verification",
      "Knowledgeable in ML, NLP, LLM, familiar with fine-tuning LLMs (Llama, Mistral), prompt engineer and developing RAG applications.",
      "Understands web development, including frontend (ReactJS), backend (Django/FastAPI), databases (PostgreSQL/MongoDB), deployment(Docker)"
    ], 
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
        title: "AI Specialist",
        company: "VINBIGDATA",
        duration: "Jul 2023 – Apr 2024",
        responsibilities: [
          "Participated in intensive AI training courses on AI/ML/CV/NLP concepts.",
          "Implemented capstone projects including aspect-based sentiment analysis and image captioning.",
          "Engaged in a challenging internship specializing in speaker recognition."
        ]
      },
      {
        title: "AI Resident",
        company: "VIETTEL GROUP",
        duration: "Apr 2023 – Jun 2023",
        responsibilities: [
          "Be selected among many candidates nationwide after going through a 3-step admission process",
          `Participated in intensive training courses focused on developing skills in data science and artificial intelligence; performed a mini-project about
          dialect and gender identification for the Vietnamese speaker, aimed to compare effectiveness of various pre-trained deep audio
          representations.`,
        ]
      },
      {
        title: "Research Engineer Intern",
        company: "VIETTEL HIGH TECH",
        duration: "Jul 2022 – Nov 2022",
        responsibilities: [
          "Learned the fundamentals of signal processing; developed a voice activity detection model for speech signals using LSTM",
          "Researched to solve the problem of data drift when with real-world data"
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
      cloud_ai_platform: ["Vertex AI", "AWS Sagemaker"]
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
      // {
      //   title: "Voice Cloning",
      //   details: "Developed a voice assistant using IBM Watson and GPT-3. Integrated IBM Watson's Speech-to-Text with GPT-3 for intelligent responses."
      // },
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
      // chinese: "HSK …",
      activities: "Runner-up Iron Team"
    }
  };

  const [loading, setLoading] = useState(true); // State for loading
  const [professionalExperience, setProfessionalExperience] = useState([]); // Initialize state for professional experience

  // Fetch professional experience data from the API
  const getProfessionalExperienceData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/about'); // Adjust the endpoint to match your API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfessionalExperience(data.professional_experiences); // Update state with professional experience data
      // console.log("professionalExperience", professionalExperience)
    } catch (error) {
      console.error('Error fetching professional experience data:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };


  // // Call the API when the component mounts
  // useEffect(() => {
  //   getProfessionalExperienceData();
    
  // }, []);

  // console.log("professionalExperience", professionalExperience)

  // // Conditionally render content if data is available
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!professionalExperience.length) {
  //   return <div>Error loading professional experience data</div>;
  // }

  const [resumeData, setResumeData] = useState(null);

  const getResumeData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/resume');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResumeData(data.resume[0])

    } catch(error) {
      console.error('Error fetching professional experience data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getResumeData();
  }, []);

  console.log("resumeData:", resumeData)

  // Check if resumeData is null or doesn't contain expected properties
  if (!resumeData || !resumeData.certifications) {
  // return <div>Error: Resume data is not available</div>;
  return null;
  }

  return (
    // <div style={{ backgroundColor: '#4a90e2' }}>
      <div 
      // style={{ backgroundColor: '#4a90e2' }} 
      className="px-4 py-8 w-3/5 mx-auto p-6 text-lg">
        <h1
          style={{ fontFamily: "Proxima Nova Bold, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          className="text-4xl font-bold mb-4 text-center"
        >
          About
        </h1>

        <p className="mb-8 text-center">
        Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology
        </p>


      {/* <div className=' bg-white shadow-md'>
        <Intro/>z
      </div> */}

      <div className='bg-white shadow-md'>
        <Summary summary={resume.summary}/>
      </div>

      <div className='bg-white shadow-md'>
        <Experience professionalExperience={resumeData.professional_experience}/>
        {/* <Experience professionalExperience={professionalExperience}/> */}
      </div>

      <div className="bg-white shadow-md">
        <TechnicalSkills resume={resume} />
      </div>

      <div className='bg-white shadow-md'>
        <Education education={resumeData.education} />
      </div>

      <div className='bg-white shadow-md'>
        <Certifications certifications={resumeData.certifications}></Certifications>
      </div>

      <div className='bg-white shadow-md'>
        <Others others={resume.others}></Others>
      </div>

      </div>
    // </div>
  );
};

export default AboutPage;
