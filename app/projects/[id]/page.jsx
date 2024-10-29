"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import Markdown from "markdown-to-jsx";
// import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// import { useEffect, useState } from "react";
import Index from './ProjectDetails';

// const fetchProjects = async () => {
//   const response = await fetch('/projects.jsonl');
//   console.log(response)
//   const text = await response.text();
//   const projects = text.split('\n').filter(line => line.trim() !== '').map(line =>JSON.parse(line));
//   return projects;
// };

const fetchProjectById = async (id) => {
  try {
    // Fetch the project by id from the Django API
    const response = await fetch(`http://localhost:8000/api/projects/${id}`);
    // const response = await fetch(`https://namfam-backend.onrender.com/api/projects/${id}/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const project = await response.json();

    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};


// const fetchProjects = async () => {
//   try {
//     // Replace 'your-api-endpoint' with the actual endpoint URL
//     const response = await fetch('http://127.0.0.1:8000/api/projects/');
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Parse the response as JSON
//     const projects = await response.json();
    
//     return projects;
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return [];
//   }
// };


export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');


  const [content, setContent] = useState("");

  useEffect(() => {
      // Fetch Markdown content from a local file
      fetch("Page.md")
          .then((res) => res.text())
          .then((text) => setContent(text))
          .catch((error) => console.error("Error fetching the markdown file:", error));
  }, []);

  // useEffect(() => {
  //   const loadProjects = async () => {
  //     try {
  //       const projects = await fetchProjects();
  //       const selectedProject = projects.find(p => p.id === id);
  //       setProject(selectedProject);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProjects();
  // }, [id]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const selectedProject = await fetchProjectById(id);
        if (selectedProject) {
          setProject(selectedProject);
        } else {
          setError(new Error('Project not found'));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) return<p>Loading...</p>;
  if (error) return<p>Error loading project: {error.message}</p>;
  if (!project) return<p>Project not found.</p>;

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
    <div className="px-4 py-8 w-full max-w-5xl mx-auto">
      {/* <h1 className="text-4xl font-bold mb-4 text-center">{project.title}</h1>
      <p className="text-lg mb-6">{project.description}</p> */}
      
      <Index></Index>



    </div>
  );
}
