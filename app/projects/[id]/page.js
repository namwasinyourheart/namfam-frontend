"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const fetchProjects = async () => {
  const response = await fetch('/projects.jsonl');
  console.log(response)
  const text = await response.text();
  const projects = text.split('\n').filter(line => line.trim() !== '').map(line =>JSON.parse(line));
  return projects;
};


export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await fetchProjects();
        const selectedProject = projects.find(p => p.id === id);
        setProject(selectedProject);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [id]);

  if (loading) return<p>Loading...</p>;
  if (error) return<p>Error loading project: {error.message}</p>;
  if (!project) return<p>Project not found.</p>;

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="px-4 py-8 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-6">{project.description}</p>

      {/* Horizontal Scroll Container */}
      <div className="relative mb-">
        <div className="overflow-hidden mb-4">
          <div 
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0" // Ensure each image is a single control width
              />
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2 mb-4">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="prose mb-8">
        <p>{project.content}</p>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Key Features</h2>
        <ul className="list-disc pl-5">
          {project.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Technologies Used */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Technologies Used:</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-white"
              style={{
                backgroundColor: tech === 'React' ? '#61DAFB' : 
                                tech === 'Tailwind CSS' ? '#38B2AC' :
                                tech === 'Django' ? '#0C4B33' :
                                tech === 'AI Models for Text Summarization' ? '#FBBF24' : 
                                '#E2E8F0' // Fallback color
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
      </div>
      {/* Demo and Repository Links */}
      <div className="mb-6">
        <a href={project.demoLink} className="text-blue-600 hover:underline mr-4" target="_blank" rel="noopener noreferrer">
          View Demo
        </a>
        <a href={project.repoLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          View Repository
        </a>
      </div>
    </div>
  );
}
