"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const fetchProjects = async () => {
  try {
    // const response = await fetch("http://localhost:8000/api/projects/");
    const response = await fetch('https://namfam-backend.onrender.com/api/projects/');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const allCategories = ["All", ...new Set(projects.flatMap((p) => p.categories?.map((c) => c.name) || []))];

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.categories?.some((c) => c.name === selectedCategory));

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="px-4 py-8 w-4/5 mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Projects</h1>
      <p className="mb-8 text-center">Explore some of the projects I&apos;ve worked on.</p>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center flex-wrap gap-4">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {currentProjects.map((project) => (
          <div key={project.id} className="h-80 relative group">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full rounded-lg object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-3xl font-bold text-center">{project.title}</p>
              <p className="text-md text-center mb-4 p-4">{project.description}</p>
              <Link href={`/projects/${project.id}`}>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-lg">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredProjects.length > itemsPerPage && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            &lt;&lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md transition ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}
