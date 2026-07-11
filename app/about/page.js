import { BACKEND_URL } from "../../utils/config";
import AboutContent from "./AboutContent";

async function getResumeData() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/resume`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.resume[0];
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return null;
  }
}

async function getProjects() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function AboutPage() {
  const [resumeData, projects] = await Promise.all([getResumeData(), getProjects()]);

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Failed to load data.</p>
      </div>
    );
  }

  return <AboutContent resumeData={resumeData} projects={projects} />;
}
