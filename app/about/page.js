"use client"

import Experience from './Experience'
import TechnicalSkills from './TechnicalSkills';
import Education from './Education';
import Certifications from './Certifications'
import Others from './Others'
import Summary from './Summary';

import React, { useState, useEffect, useRef } from 'react';
import { BACKEND_URL, RESUME_FILEPATH } from "../../utils/config";
import { User, Briefcase, Code2, GraduationCap, Award, MoreHorizontal, FileText, FolderKanban, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sections = [
  { id: "summary", label: "Summary", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "others", label: "Others", icon: MoreHorizontal },
];

const SectionHeader = ({ icon: Icon, title, delay }) => (
  <div
    className="flex items-center gap-3 mb-6 animate-fadeInUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white shadow-lg">
      <Icon size={20} />
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold text-black">{title}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-2" />
  </div>
);

const TableOfContents = ({ activeSection }) => (
  <nav className="hidden lg:flex flex-col gap-1 sticky self-start" style={{ top: '4rem' }}>
    {sections.map((section) => {
      const Icon = section.icon;
      const isActive = activeSection === section.id;
      return (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            isActive
              ? 'bg-black text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-black border border-gray-200'
          }`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Icon size={14} />
          <span>{section.label}</span>
        </a>
      );
    })}
  </nav>
);

const MobileTOC = ({ activeSection }) => (
  <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 mt-14">
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-1 px-4 py-2 min-w-max">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </div>
  </div>
);

const AboutPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("summary");

  const getResumeData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/resume`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setResumeData(data.resume[0]);
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/projects/`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProjects(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    Promise.all([getResumeData(), getProjects()]).finally(() => setLoading(false));
  }, []);

  // Scrollspy
  useEffect(() => {
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size > 0) {
          const firstVisible = sections.find((s) => visible.has(s.id));
          if (firstVisible) setActiveSection(firstVisible.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!resumeData || !resumeData.certifications) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        .animate-hero {
          animation: heroSlideDown 0.8s ease-out both;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>

      <MobileTOC activeSection={activeSection} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden animate-hero">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-400 rounded-full blur-3xl" />
          </div>

          <div className="relative px-4 sm:px-6 py-12 sm:py-20 text-center">
            <div className="mb-6">
              <img
                src="https://avatars.githubusercontent.com/u/102389548?v=4"
                alt="Nam Pham"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white/30 shadow-2xl mx-auto object-cover grayscale"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
              Nam Pham
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-xl mx-auto">
              AI Engineer focused on building intelligent systems
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a href="https://github.com/namwasinyourheart" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium">
                GitHub
              </a>
              <a href={`/${RESUME_FILEPATH}`} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2">
                <FileText size={16} />
                View Resume
              </a>
              <a href="mailto:itsnamfam@gmail.com"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/20 transition-all duration-300 text-sm font-medium">
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Content + Desktop TOC */}
        <div className="relative px-4 sm:px-6 py-8 sm:py-14 w-full sm:w-4/5 md:w-3/5 mx-auto">
          <div className="flex gap-8">
            <div className="flex-1 space-y-12">
            <section id="summary" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '100ms' }}>
              <SectionHeader icon={User} title="Summary" delay={100} />
              <Summary summary={resumeData.summary} />
            </section>

            <section id="experience" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '200ms' }}>
              <SectionHeader icon={Briefcase} title="Experience" delay={200} />
              <Experience professionalExperience={resumeData.professional_experience} />
            </section>

            <section id="skills" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '300ms' }}>
              <SectionHeader icon={Code2} title="Technical Skills" delay={300} />
              <TechnicalSkills technicalSkills={resumeData.technical_skills} />
            </section>

            {projects.length > 0 && (
              <section id="projects" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '400ms' }}>
                <SectionHeader icon={FolderKanban} title="Projects" delay={400} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="group block rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-400 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-black text-sm mb-1 group-hover:text-gray-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {project.description}
                        </p>
                        {project.categories?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.categories.slice(0, 2).map((cat, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View All Projects
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </section>
            )}

            <section id="education" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '500ms' }}>
              <SectionHeader icon={GraduationCap} title="Education" delay={500} />
              <Education education={resumeData.education} />
            </section>

            <section id="certifications" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '550ms' }}>
              <SectionHeader icon={Award} title="Certifications" delay={550} />
              <Certifications certifications={resumeData.certifications} />
            </section>

            <section id="others" className="animate-fadeInUp scroll-mt-16" style={{ animationDelay: '600ms' }}>
              <SectionHeader icon={MoreHorizontal} title="Others" delay={600} />
              <Others others={resumeData.others} />
            </section>
            </div>

            <TableOfContents activeSection={activeSection} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
