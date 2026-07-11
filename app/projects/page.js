import { BACKEND_URL } from "../../utils/config";
import ProjectsContent from "./ProjectsContent";

async function getProjects() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsContent projects={projects} />;
}
