import { getProjects } from '@/lib/projects'
import ProjectsSection from '@/components/projects-section'

/**
 * Server wrapper: pulls projects from Sanity (falling back to the local list)
 * and hands them to the animated client section.
 */
export default async function Projects() {
  const projects = await getProjects()
  return <ProjectsSection projects={projects} />
}
