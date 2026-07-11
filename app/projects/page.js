"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BACKEND_URL } from "../../utils/config";

const fetchProjects = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/`);
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  const allCategories = [
    "All",
    ...new Set(projects.flatMap((p) => p.categories?.map((c) => c.name) || [])),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) =>
          p.categories?.some((c) => c.name === selectedCategory)
        );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 w-full sm:w-4/5 mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Projects</h1>
      <p className="mb-8 text-center text-gray-500">
        Explore some of the projects I&apos;ve worked on.
      </p>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="h-72 relative group rounded-xl overflow-hidden cursor-pointer border border-gray-200">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                <p className="text-xl font-bold text-white text-center mb-2">
                  {project.title}
                </p>
                <p className="text-sm text-gray-300 text-center line-clamp-2 mb-3">
                  {project.description}
                </p>
                <span className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {filteredProjects.length > itemsPerPage && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-black text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
