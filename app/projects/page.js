
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Navbar from './Navbar'; // Adjust the import path as necessary
// const fetchProjects = async () => {
//   const response = await fetch('/projects.jsonl');
//   console.log(response)
//   const text = await response.text();
//   const projects = text.split('\n').filter(line => line.trim() !== '').map(line =>JSON.parse(line));
//   return projects;
// };

const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/projects/');
    // const response = await fetch('https://namfam-backend.onrender.com/api/projects/');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const projects = await response.json();

    // console.log(projects)
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};



export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  // Extract unique categories from the projects
  const allCategories = projects.reduce((categories, project) => {
    if (Array.isArray(project.categories)) {
      project.categories.forEach(category => {
        if (!categories.includes(category.name)) {
          categories.push(category.name);
        }
      });
    }
    return categories;
  }, ['All']);  // Start with 'All' for the default category option

  // Function to filter projects by selected category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    // : projects.filter(project => project.category === selectedCategory);
    : projects.filter(project => 
      Array.isArray(project.categories) &&  // Check if categories is an array
      project.categories.some(category => category.name === selectedCategory)  // Check for selected category
    );
 
 
    // Calculate the projects to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <div className="px-4 py-8 w-4/5 mx-auto">
      {/* <div className="px-0 py-0  w-full max-w-4xl mx-auto"> */}
        <h1 className="text-4xl font-bold mb-4 text-center">Projects</h1>
        <p className="mb-8 text-center">Here are past projects I&apos;ve worked on. Click on to see more.</p>
        
        {/* Navbar for Category Selection */}
        {/* <div className="mb-8 flex justify-center space-x-4">
          {['All', 'ML', 'DL', 'NLP', 'CV', 'LLM/VLM', 'RAG', 'AI App'].map(category => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Navbar for Category Selection */}

        {/* Navbar for Category Selection */}
        <div className="mb-8 flex justify-center space-x-4">
          {/* {['All', 'ML', 'DL', 'NLP', 'CV', 'LLM/VLM', 'RAG', 'AI App'].map(category => ( */}
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* <div className="mb-8 flex justify-center space-x-4">
          <button
            key="All"
            onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'All' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}  // Assuming each category has a unique id
              onClick={() => { setSelectedCategory(category.name); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category.name ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div> */}


        <div className="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {currentProjects.map(project => (
            <div key={project.id} className="h-80 relative group">
            {/* <div key={project.id} className="h-60 relative bg-white shadow-md group"> */}
            {/* // <div key={project.id} className="relative p-4 h-60 border rounded-md bg-white shadow-md group"> */}
              <img src={project.thumbnail} alt={project.title} className="w-full h-full rounded-lg object-cover" />
              <div className="absolute rounded-lg inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-3xl text-center font-bold">{project.title}</p>
                <p className="text-md text-center mb-4 p-4">{project.description}</p>
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-center"
                >
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg">
                    View Details
                  </button>
                </Link>
              </div>
              {/* <h2 className="absolute top-4 left-4 right-4 text-2xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded-md text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                {project.title}
              </h2> */}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {/* {filteredProjects.length > itemsPerPage && (
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
            >
              Next
            </button>
          </div>
        )} */}

        {/* Pagination Controls */}
        {filteredProjects.length > itemsPerPage && (
          <div className="mt-8 flex justify-center space-x-4"><button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              // className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
              className='px-4 py-2 rounded-md bg-gray-300'
            >
              &lt;&lt;
            </button>
            
            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
              >
                {index + 1}
              </button>
            ))}
            
            <button onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className='px-4 py-2 rounded-md bg-gray-300'
            // className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}
            
            >
              &gt;&gt;
            </button></div>
        )}

      </div>
    </div>
  );
}
