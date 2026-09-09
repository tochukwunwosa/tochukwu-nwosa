import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import ProjectList from '@/components/projects/project-list'

export const revalidate = 60

const description =
  'Products I built and client work I shipped — with case studies covering the problem, the stack, and the decisions behind each one.'

export const metadata: Metadata = {
  title: 'Projects | Tochukwu Nwosa',
  description,
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Tochukwu Nwosa',
    description,
    url: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectList projects={projects} />
}
