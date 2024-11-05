import React, { useEffect, useState } from 'react';
import { GithubIcon, UserIcon } from 'lucide-react';

const ProjectDetails = ({ 
  title, 
  description, 
  views, 
  githubLink, 
  projectType, 
  overview, 
  goals, 
  techStack,
  designProcess,
  demoVideo
}) => {

// const [currentImageIndex, setCurrentImageIndex] = useState(0);

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedImage, setSelectedImage] = useState('');


// const openModal = (image) => {
//     setSelectedImage(image);
//     setIsModalOpen(true);
//     };

//     const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage('');
//     };
    
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <header>
        <h1 className="text-5xl font-bold mb-2">{title}</h1>
        <p className="text-xl mb-4">{description}</p>
        <div className="flex items-center space-x-4 mb-4">
          <span>{views} views</span>
          <span>-</span>
          <a href={githubLink} className="flex items-center text-green-400 hover:underline">
            <GithubIcon className="w-5 h-5 mr-1" />
            Github
          </a>
        </div>
        <div className="flex items-center text-black-300">
          <UserIcon className="w-5 h-5 mr-2" />
          <span>{projectType}</span>
        </div>
      </header>

      <div className="my-4 border-b border-gray-300" />

        

 

      <main className="mt-8">
        <section>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Overview</h2>
          <p className="mb-4">{overview}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Project Goals</h2>
          <p>{goals}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-2">
            {techStack.map((tech, index) => (
              <li key={index}>
                <strong>{tech.name}:</strong> {tech.description}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Design Process</h2>
          <p>{designProcess.description}</p>
          <img src={designProcess.image} alt="Design Process" className="mt-4 w-full max-w-3xl mx-auto object-cover rounded-lg shadow-lg" />
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Demo Video</h2>
          <p>{demoVideo.description}</p>
          <div className="mt-4 w-full max-w-3xl mx-auto">
            <video 
              controls 
              className="w-full rounded-lg shadow-lg"
              poster={demoVideo.thumbnail}
            >
              <source src={demoVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </main>
    </div>
  );
};

// export default ProjectDetails;

// import React from 'react';
// import ProjectDetails from '../components/ProjectDetails';

const Index = () => {
  const projectData = {
    title: "Opiniometer",
    description: "Analyze an opinion on a specific topic based on Twitter posts!",
    views: 655,
    githubLink: "#",
    projectType: "Personal Project",
    overview: "Analyze whether an opinion on a specific topic is Positive / Negative / Neutral based on recent tweets! It's possible using the Natural Language Processing (NLP) concept called Sentiment Analysis that can determine if a chunk of text is positive, negative, or neutral based on its polarity.",
    goals: "I learned about Sentiment Analysis from my Linear Algebra professor at college and was inspired to combine those with my frontend engineering skills by creating a dynamic visualization with Chart.js.",
    techStack: [
      {
        name: "React",
        description: "Used React for the front end with the use of React Hooks for state management and lifecycle, React Router that makes it possible to navigate between components and create a Single Web Application."
      },
      {
        name: "Framer Motion",
        description: "A Motion system library that makes it smooth and fluid when transitioning between pages."
      },
      {
        name: "Chart.js",
        description: "A data visualization library for displaying the final result."
      },
      {
        name: "Python (Tweepy, TextBlob, Flask)",
        description: "Utilize Python for the Backend, which uses Tweepy to interact with the Twitter API, TextBlob to calculate the polarity of each text, and Flask as a RESTful API that serves all the results in a JSON to communicate in a Frontend."
      }
    ],
    designProcess: {
      description: "I designed the site first before writing any code to decide on the colors, components, etc to make sure everything is consistent. Then, I created each React component based on the Figma I made, and added a Tweet component, that I sliced based on the real Tweet component on Twitter, to handle the Check Tweets feature. After that, I created the API endpoint with Python to analyze the tweets, while making sure to filter retweets and links because most of them are spam.",
      image: "/path/to/design-process-image.jpg" // Replace with the actual path to your design process image
    },
    demoVideo: {
      description: "After the API changes in Twitter, the live site no longer works, so here's a demo video I recorded back in 2021.",
      url: "https://www.youtube.com/embed/hsOJhs3_UCM", // Replace with the actual path to your demo video
      thumbnail: "/path/to/video-thumbnail.jpg" // Replace with the actual path to your video thumbnail
    }
  };

  return <ProjectDetails {...projectData} />;
};

export default Index;    
    
    
    //   //  {/* Horizontal Scroll Container */}
    //    <div className="relative mb-">
    //    <div className="overflow-hidden mb-4">
    //      <div 
    //        className="flex transition-transform duration-300"
    //        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
    //      >
    //        {project.images.images.map((image, index) => (
    //          <Image
    //            key={index}
    //            src={image}
    //            // layout="fill"
    //            width={800}
    //            height={600}
    //            alt={`Project image ${index + 1}`}
    //            className="w-full h-64 object-cover flex-shrink-0" // Ensure each image is a single control width
    //            onClick={() => openModal(image)} // Open modal on click
    //          />
    //        ))}
    //      </div>
    //    </div>


    //    <div className="flex justify-center space-x-2 mb-4">
    //      {project.images.images.map((_, index) => (
    //        <button
    //          key={index}
    //          onClick={() => handleImageClick(index)}
    //          className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
    //        />
    //      ))}
    //    </div>
    //  </div>
     
    // //  {/* Modal for zooming image */}
    //  {isModalOpen && (
    //    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
    //      <div className="relative">
    //        {/* Styled close button */}
    //        <button
    //          className="absolute top-4 right-4 bg-gray-800 text-white rounded w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-700 transition duration-300"
    //          onClick={closeModal}
    //        >
    //          &times;
    //        </button>
    //        <Image
    //          src={selectedImage}
    //          width={1200} // Adjust size as needed
    //          height={900} // Adjust size as needed
    //          alt="Zoomed image"
    //          className="max-w-full max-h-full" // Ensure it fits the screen
    //        />
    //      </div>
    //    </div>
    //  )}