import { BACKEND_URL } from "../../../utils/config";
import ProjectDetails from "./ProjectDetails";

async function getProject(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${id}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

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

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Project not found.</p>
      </div>
    );
  }

  const projectData = convertKeysToCamelCase(project);

  return (
    <div className="px-4 py-8 w-full max-w-5xl mx-auto">
      <ProjectDetails projectDetails={projectData} />
    </div>
  );
}
