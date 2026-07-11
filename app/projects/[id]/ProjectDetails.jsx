import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { BACKEND_URL } from "../../../utils/config";

const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
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

const ProjectDetails = ({ projectDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const images = projectDetails?.images
    ? projectDetails.images.split(/\r?\n/).filter(img => img.trim())
    : [];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="w-full sm:w-4/5 mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{projectDetails.title}</h1>
          <p className="text-lg text-gray-500 mb-4">{projectDetails.description}</p>

          {projectDetails?.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {projectDetails.categories.map((cat, index) => (
                <span key={index} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Demo & Repo Links */}
          <div className="flex flex-wrap gap-3">
            {projectDetails.demoLink && (
              <a
                href={projectDetails.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {projectDetails.repoLink && (
              <a
                href={projectDetails.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              >
                <Github size={14} />
                Repository
              </a>
            )}
          </div>
        </header>

        <div className="border-t border-gray-200" />

        {/* Image Carousel */}
        {images.length > 0 && (
          <section className="mt-8">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={800}
                    height={600}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-64 sm:h-80 object-cover flex-shrink-0 cursor-pointer"
                    onClick={() => openModal(image)}
                  />
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-black scale-110' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Content Sections */}
        <main className="mt-10 space-y-10">
          {projectDetails?.overview && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed ml-4">{projectDetails.overview}</p>
            </section>
          )}

          {projectDetails?.hightlight && projectDetails.hightlight.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Highlights</h2>
              <div className="ml-4 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {projectDetails.hightlight.split(/\r?\n/).filter(s => s.trim()).map((item, index) => {
                      const [title, ...descParts] = item.split(':');
                      const description = descParts.join(':').trim();
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-black whitespace-nowrap border-r border-gray-200 w-[200px]">{title.trim()}</td>
                          <td className="py-3 px-4 text-gray-600">{description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {projectDetails?.features && projectDetails.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Key Features</h2>
              <div className="ml-4 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {projectDetails.features.split(/\r?\n/).filter(s => s.trim()).map((feature, index) => {
                      const [title, ...descParts] = feature.split(':');
                      const description = descParts.join(':').trim();
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-black whitespace-nowrap border-r border-gray-200 w-[200px]">{title.trim()}</td>
                          <td className="py-3 px-4 text-gray-600">{description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {projectDetails?.techStack && projectDetails.techStack.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Tech Stack</h2>
              <div className="ml-4 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {projectDetails.techStack.split(/\r?\n/).filter(s => s.trim()).map((line, index) => {
                      const [name, ...descParts] = line.split(':');
                      const description = descParts.join(':').trim();
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-black whitespace-nowrap border-r border-gray-200 w-[200px]">{name.trim()}</td>
                          <td className="py-3 px-4 text-gray-600">{description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {projectDetails?.designProcess && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Design Process</h2>
              <p className="text-gray-600 leading-relaxed ml-4">{projectDetails.designProcess.description}</p>
              {projectDetails.designProcess.image && (
                <img
                  src={projectDetails.designProcess.image}
                  alt="Design Process"
                  className="mt-4 ml-4 w-full max-w-3xl object-cover rounded-xl shadow-sm"
                />
              )}
            </section>
          )}

          {projectDetails?.demoVideo && (
            <section>
              <h2 className="text-2xl font-bold mb-3 border-l-4 border-black pl-4">Demo Video</h2>
              {projectDetails.demoVideo.description && (
                <p className="text-gray-600 ml-4 mb-4">{projectDetails.demoVideo.description}</p>
              )}
              <div className="w-full max-w-3xl ml-4">
                <video
                  controls
                  className="w-full rounded-xl shadow-sm"
                  poster={projectDetails.demoVideo.thumbnail}
                >
                  {projectDetails.demoVideo.url && (
                    <source src={projectDetails.demoVideo.url} type="video/mp4" />
                  )}
                </video>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={selectedImage}
              width={1200}
              height={900}
              alt="Zoomed image"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-500">Error loading project: {error.message}</p>
          <Link href="/projects" className="text-sm text-blue-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-500">Project not found.</p>
          <Link href="/projects" className="text-sm text-blue-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const projectData = convertKeysToCamelCase(project);

  return <ProjectDetails projectDetails={projectData} />;
};

export default Index;
