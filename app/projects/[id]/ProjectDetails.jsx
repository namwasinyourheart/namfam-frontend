import React, { useEffect, useState } from 'react';
import { GithubIcon, UserIcon } from 'lucide-react';

import Image from 'next/image'
import { useParams } from 'next/navigation';

const fetchProjectById = async (id) => {
  try {
    // const response = await fetch(`http://localhost:8000/api/projects/${id}`);
    const response = await fetch(`https://namfam-backend.onrender.com/api/projects/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const project = await response.json();
    return project;

  
  } catch (error) {
    console.error('Error fetching project:', error);
    return null
  }

  
};

function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
  } else if (obj !== null && obj && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
          const camelCaseKey = key.replace(/_\w/g, m => m[1].toUpperCase());
          acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
          return acc;
      }, {});
  }
  return obj;
}


const parseTechStack = (techStackString) => {
  return techStackString.split('\n').map((line) => {
    const [name, ...descriptionParts] = line.split(':');
    const description = descriptionParts.join(':').trim(); // Join the parts back in case of additional colons
    return {
      name: name.trim(),
      description: description,
    };
  });
};

const ProjectDetails = ({projectDetails}) => {

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
const [currentImageIndex, setCurrentImageIndex] = useState(0);

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState('');

const handleImageClick = (index) => {
    setCurrentImageIndex(index);
};



const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
};

    
  return (
    <div className="min-h-screen bg-white text-black">
      <header>
      {/* <h1 className="text-4xl font-bold mb-4 text-center">{project.title}</h1>
      <p className="text-lg mb-6">{project.description}</p> */}
        <h1 className="text-4xl font-bold mb-2 text-center">{projectDetails.title}</h1>
        <p className="text-md mb-8">{projectDetails.description}</p>
                
        {/* Horizontal Scroll Container */}
        <div className="relative mb-">
        <div className="overflow-hidden mb-4">
            <div 
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
            {/* {projectDetails.images.map((image, index) => (
                <Image
                key={index}
                src={image}
                // layout="fill"
                width={800}
                height={600}
                alt={`Project image ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0" // Ensure each image is a single control width
                onClick={() => openModal(image)} // Open modal on click
                />
            ))} */}

          {/* {projectDetails?.images?.length > 0 && projectDetails.images.map((image, index) => (
              <Image
                  key={index}
                  src={image}
                  width={800}
                  height={600}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-64 object-cover flex-shrink-0" // Ensure each image is a single control width
                  onClick={() => openModal(image)} // Open modal on click
              />
          ))} */}


          {projectDetails?.images ? (
              projectDetails.images.split('\r\n').map((image, index) => (
                  <Image
                      key={index}
                      src={image}
                      width={800}
                      height={600}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-64 object-cover flex-shrink-0" // Ensure each image is a single control width
                      onClick={() => openModal(image)} // Open modal on click
                  />
              ))
          ) : (
              <></>
              // <p>No images available.</p> // Fallback if no images exist
              
          )}



            </div>
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center space-x-2">
            {projectDetails.images.map((_, index) => (
            <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
            ))}
        </div> */}


        {projectDetails?.images ? (
            <div className="flex justify-center space-x-2">
                {projectDetails.images.split('\r\n').map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        ) : (
          <></>
            // <p>No images available.</p> // Fallback if no images exist
        )}


        {/* {projectDetails?.images?.length > 0 && (
          <div className="flex justify-center space-x-2">
              {projectDetails.images.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
              ))}
          </div>
      )} */}


        </div>
        
        {/* Modal for zooming image */}
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative">
            {/* Styled close button */}
            <button
                className="absolute top-4 right-4 bg-gray-800 text-white rounded w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-700 transition duration-300"
                onClick={closeModal}
            >
                &times;
            </button>
            <Image
                src={selectedImage}
                width={1200} // Adjust size as needed
                height={900} // Adjust size as needed
                alt="Zoomed image"
                className="max-w-full max-h-full" // Ensure it fits the screen
            />
            </div>
        </div>
        )}
        {/* <div className="flex items-center space-x-4 mb-4">
          <span>{projectDetails.views} views</span>
          <span>-</span>
          <a href={projectDetails.githubLink} className="flex items-center text-green-400 hover:underline">
            <GithubIcon className="w-5 h-5 mr-1" />
            Github
          </a>
        </div>
        <div className="flex items-center text-black-300">
          <UserIcon className="w-5 h-5 mr-2" />
          <span>{projectDetails.projectType}</span>
        </div> */}

        {/* Demo and Repository Links */}
        <div className="mb-6">
            <a href={projectDetails.demoLink} className="text-blue-600 hover:underline mr-4" target="_blank" rel="noopener noreferrer">
            View Demo
            </a>
            <a href={projectDetails.repoLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            View Repository
            </a>
        </div>

      </header>

      <div className="my-4 border-b border-gray-300" />
 

      <main className="mt-8">

        {/* <section>
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Overview</h2>
          <p className="mb-4">{projectDetails.overview}</p>
        </section> */}

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Overview</h2>
          {projectDetails?.overview ? ( // Check if projectGoal exists
              <p className='ml-4'>{projectDetails.overview}</p>
          ) : (
              // <p>No project overview information available.</p> // Fallback if projectGoal does not exist
              <></>
          )}
      </section>


        {/* <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Project Goals</h2>
          <p>{projectDetails.projectGoal}</p>
        </section> */}

        {/* <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-2">
            {projectDetails.techStack.map((tech, index) => (
              <li key={index}>
                <strong>{tech.name}:</strong> {tech.description}
              </li>
            ))}
          </ul>
        </section> */}

        

        {/* <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Tech Stack</h2>
          {projectDetails?.techStack?.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {projectDetails.techStack.map((tech, index) => (
                <li key={index}>
                  <strong>{tech.name}:</strong> {tech.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tech stack information available.</p> // Fallback if no tech stack data is present
          )}
        </section> */}

        <section className="mt-8">
            {projectDetails?.hightlight && projectDetails.hightlight.length > 0 ? (
                <>
                    <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">
                        Highlights
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        {projectDetails.hightlight.split('\r\n').map((hightlight, index) => {
                            const [title, ...descriptionParts] = hightlight.split(':');
                            const description = descriptionParts.join(':').trim(); // Join back any additional colons
                            return (
                                <li key={index}>
                                    <strong>{title.trim()}:</strong> {description}
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                // <p>No key features available.</p> // Fallback if no key features exist
                <></>
            )}
        </section>



        <section className="mt-8">
            {projectDetails?.features && projectDetails.features.length > 0 ? (
                <>
                    <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">
                        Key Features
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        {projectDetails.features.split('\r\n').map((feature, index) => {
                            const [title, ...descriptionParts] = feature.split(':');
                            const description = descriptionParts.join(':').trim(); // Join back any additional colons
                            return (
                                <li key={index}>
                                    <strong>{title.trim()}:</strong> {description}
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                // <p>No key features available.</p> // Fallback if no key features exist
                <></>
            )}
        </section>


        <section className="mt-8">
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Tech Stack</h2>
            {projectDetails?.techStack ? (
                <ul className="list-disc list-inside space-y-2 ml-4">
                    {projectDetails.techStack.split('\n').map((line, index) => {
                        const [name, ...descriptionParts] = line.split(':');
                        const description = descriptionParts.join(':').trim(); // Join the parts back in case of additional colons
                        return (
                            <li key={index}>
                                <strong>{name.trim()}:</strong> {description}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                // <p>No tech stack information available.</p> // Fallback if no tech stack data is present
                <></>
            )}
        </section>


        {/* <section className="mt-8">
            {projectDetails.keyFeatures && projectDetails.keyFeatures.length > 0 && (
                <>
                <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">
                    Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    {projectDetails.keyFeatures.map((feature, index) => (
                    <li key={index}>
                        <strong>{feature.split(':')[0]}:</strong> {feature.split(':')[1]}
                    </li>
                    ))}
                </ul>
                </>
            )}
        </section> */}


        
        <section className="mt-8">
          
          {projectDetails?.designProcess ? (
            <>
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Design Process</h2>
              <p>{projectDetails.designProcess.description}</p>
              {projectDetails.designProcess.image && (
                <img
                  src={projectDetails.designProcess.image}
                  alt="Design Process"
                  className="ml-4 mt-4 w-full max-w-3xl mx-auto object-cover rounded-lg shadow-lg"
                />
              )}
            </>
          ) : (
            // <p className='ml-4'>No design process information available.</p> // Fallback if no data is available
            <></>
          )}
        </section>


        {/* <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Design Process</h2>
          <p>{projectDetails.designProcess.description}</p>
          <img src={projectDetails.designProcess.image} alt="Design Process" className="mt-4 w-full max-w-3xl mx-auto object-cover rounded-lg shadow-lg" />
        </section> */}


        <section className="mt-8">
          
          {projectDetails?.demoVideo ? (
            <>
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Demo Video</h2>
              <p>{projectDetails.demoVideo.description}</p>
              <div className="mt-4 w-full max-w-3xl mx-auto">
                <video 
                  controls 
                  className="w-full rounded-lg shadow-lg"
                  poster={projectDetails.demoVideo.thumbnail}
                >
                  {projectDetails.demoVideo.url ? (
                    <source src={projectDetails.demoVideo.url} type="video/mp4" />
                  ) : (
                    <p>Your browser does not support the video tag.</p>
                  )}
                </video>
              </div>
            </>
          ) : (
            // <p className='ml-4'> No demo video available.</p> // Fallback if demoVideo data is not present
            <></>
          )}
        </section>


        {/* <section className="mt-8">
          <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-400 pl-4">Demo Video</h2>
          <p>{projectDetails.demoVideo.description}</p>
          <div className="mt-4 w-full max-w-3xl mx-auto">
            <video 
              controls 
              className="w-full rounded-lg shadow-lg"
              poster={projectDetails.demoVideo.thumbnail}
            >
              <source src={projectDetails.demoVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section> */}



      </main>
    </div>
  );
};

// export default ProjectDetails;

// import React from 'react';
// import ProjectDetails from '../components/ProjectDetails';

const Index = () => {

  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const selectedProject = await fetchProjectById(id);
        if (selectedProject) {
          setProject(selectedProject);
          // console.log('project:', project)
        } else {
          setError(new Error('Loading project...'));
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }
      };
      loadProject();
    }, [id]);

  

  if (loading) return<p>Loading...</p>;
  if (error) return<p>Error loading project: {error.message}</p>;
  if (!project) return<p>Project not found.</p>;

  const projectData = convertKeysToCamelCase(project);

  // console.log("projectData:", projectData)


  // const projectData = {
  //   title: "Opiniometer",
  //   description: "A simple machine learning app that predicts whether a breast mass is benign or malignant based on measurements, featuring a radar chart for data visualization and probability assessment.",
  //   views: 655,
  //   githubLink: "#",
  //   projectType: "Personal Project",
  //   overview: "Analyze whether an opinion on a specific topic is Positive / Negative / Neutral based on recent tweets! It's possible using the Natural Language Processing (NLP) concept called Sentiment Analysis that can determine if a chunk of text is positive, negative, or neutral based on its polarity.",
  //   goals: "I learned about Sentiment Analysis from my Linear Algebra professor at college and was inspired to combine those with my frontend engineering skills by creating a dynamic visualization with Chart.js.",
  //   techStack: [
  //     {
  //       name: "React",
  //       description: "Used React for the front end with the use of React Hooks for state management and lifecycle, React Router that makes it possible to navigate between components and create a Single Web Application."
  //     },
  //     {
  //       name: "Framer Motion",
  //       description: "A Motion system library that makes it smooth and fluid when transitioning between pages."
  //     },
  //     {
  //       name: "Chart.js",
  //       description: "A data visualization library for displaying the final result."
  //     },
  //     {
  //       name: "Python (Tweepy, TextBlob, Flask)",
  //       description: "Utilize Python for the Backend, which uses Tweepy to interact with the Twitter API, TextBlob to calculate the polarity of each text, and Flask as a RESTful API that serves all the results in a JSON to communicate in a Frontend."
  //     }
  //   ],

  //   techStack: [
  //       {
  //       name: "Python",
  //       description: "Core programming language for data pipelines"
  //       },
  //       {
  //       name: "LlamaIndex",
  //       description: "Framework for indexing, transforming, and retrieving multimodal data"
  //       },
  //       {
  //       name: "Qdrant",
  //       description: "Vector database for similarity searches based on embeddings"
  //       },
  //       {
  //       name: "Neo4j",
  //       description: "Graph database used to store and manage relationships between data entities"
  //       },
  //       {
  //       name: "Azure OpenAI (GPT-4O)",
  //       description: "Used for handling multimodal inputs, deploying models via Azure App Services"
  //       },
  //       {
  //       name: "Text Embedding Ada-002",
  //       description: "Model for generating text embeddings"
  //       },
  //       {
  //       name: "Azure Computer Vision",
  //       description: "Used for generating image embeddings"
  //       },
  //       {
  //       name: "Gradio",
  //       description: "Provides an interactive interface for querying the system"
  //       },
  //       {
  //       name: "Docker and Docker Compose",
  //       description: "Used for containerization and orchestration, ensuring consistent deployment"
  //       }
  //   ],
  //   designProcess: {
  //     description: "I designed the site first before writing any code to decide on the colors, components, etc to make sure everything is consistent. Then, I created each React component based on the Figma I made, and added a Tweet component, that I sliced based on the real Tweet component on Twitter, to handle the Check Tweets feature. After that, I created the API endpoint with Python to analyze the tweets, while making sure to filter retweets and links because most of them are spam.",
  //     image: "/path/to/design-process-image.jpg" // Replace with the actual path to your design process image
  //   },
  //   demoVideo: {
  //     description: "After the API changes in Twitter, the live site no longer works, so here's a demo video I recorded back in 2021.",
  //     url: "https://www.youtube.com/embed/hsOJhs3_UCM", // Replace with the actual path to your demo video
  //     thumbnail: "/path/to/video-thumbnail.jpg" // Replace with the actual path to your video thumbnail
  //   },
    // images: [
    //     "https://drive.google.com/uc?export=view&id=1PcdeWEHGDw8I_RyHe1OGVW0nXj5UpfJz",
    //     "https://mattfarley.ca/img/projects/burkettandco.png",
    //     "https://mattfarley.ca/img/projects/wfdesignbuild.png"
    // ],
  //   // keyFeatures: [
  //   //     "High Accuracy: Deep learning models for precise face recognition.",
  //   //     "Real-Time Processing: Fast identification in real-time.",
  //   //     "Security: Enhanced security features for sensitive applicatios."   
  //   // ],
  //   demoLink: "https://example.com",
  //   repoLink: "https://example.com"
  // };

  return <ProjectDetails projectDetails={projectData} />;
};

export default Index;