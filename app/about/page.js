import React from 'react';


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
      }
      // Add more experiences as needed
    ],
    technical_skills: {
      data_science: ["Statistical Analysis", "Data Visualization"],
      machine_learning: ["Regression", "Decision Tree", "Ensemble Methods"],
      natural_language_processing: ["CNN", "RNN/LSTM", "BERT"],
      speech_processing: ["Speaker Verification", "Text-to-Speech"],
      mlops: ["Docker", "FastAPI", "RestAPI"],
      languages_tools: ["Python", "SQL", "Git"],
      libraries_frameworks: ["Tensorflow", "Keras", "PyTorch"]
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
    additional_information: {
      english: "TOEIC certificate with score 795 - issued by IIG Mar 2023",
      chinese: "HSK …",
      activities: "Runner-up Iron Team"
    }
  };

  return (
      <div className="px-4 py-8 max-w-4xl mx-auto p-6">
        <h1
          style={{ fontFamily: "Proxima Nova Bold, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          className="text-4xl font-bold mb-4 text-center"
        >
          About
        </h1>

        <p className="mb-8 text-center">
        Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology
        </p>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="mb-2"><strong>Address:</strong> {resume.contact.address}</p>
          <p className="mb-2"><strong>Phone:</strong> {resume.contact.phone}</p>
          <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${resume.contact.email}`} className="text-blue-500">{resume.contact.email}</a></p>
          <p><strong>GitHub:</strong> <a href={`https://${resume.contact.github}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">{resume.contact.github}</a></p>
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
          {resume.professional_experience.map((job, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold">{job.title} at {job.company}</h3>
              <p className="text-gray-600 mb-2"><strong>Duration:</strong> {job.duration}</p>
              <ul className="list-disc ml-5">
                {job.responsibilities.map((responsibility, i) => (
                  <li key={i} className="mb-1">{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
        {Object.keys(resume.technical_skills).map((category, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">{category.replace(/_/g, ' ').toUpperCase()}</h3>
            <div className="flex flex-wrap gap-2">
              {resume.technical_skills[category].map((skill, idx) => (
                <span
                  key={idx}
                  className={`inline-block px-3 py-1 rounded-full text-white ${category === 'data_science' ? 'bg-blue-500' : 
                    category === 'machine_learning' ? 'bg-green-500' : 
                    category === 'natural_language_processing' ? 'bg-red-500' : 
                    category === 'speech_processing' ? 'bg-purple-500' : 
                    category === 'mlops' ? 'bg-orange-500' : 
                    category === 'languages_tools' ? 'bg-teal-500' : 
                    'bg-gray-500'}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
          {Object.entries(resume.technical_skills).map(([category, skills], index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{category.replace(/_/g, ' ').toUpperCase()}:</h3>
              <ul className="list-disc ml-5">
                {skills.map((skill, i) => (
                  <li key={i} className="mb-1">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <p className="mb-2"><strong>Institution:</strong> {resume.education.institution}</p>
          <p className="mb-2"><strong>Degree:</strong> {resume.education.degree}</p>
          <p className="mb-2"><strong>Duration:</strong> {resume.education.duration}</p>
          <p className="mb-2"><strong>Cumulative CPA:</strong> {resume.education.cumulative_cpa}</p>
          <p><strong>Graduation Thesis:</strong> {resume.education.graduation_thesis.title} (Grade: {resume.education.graduation_thesis.grade})</p>
        </section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Side Projects</h2>
          {resume.side_projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p>{project.details}</p>
            </div>
          ))}
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <p><strong>{cert.title}</strong> (Date: {cert.date})</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <p className="mb-2"><strong>English:</strong> {resume.additional_information.english}</p>
          <p className="mb-2"><strong>Chinese:</strong> {resume.additional_information.chinese}</p>
          <p><strong>Activities:</strong> {resume.additional_information.activities}</p>
        </section>
      </div>
  );
};

export default AboutPage;
