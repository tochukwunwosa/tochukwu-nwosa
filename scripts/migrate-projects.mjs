/**
 * One-time migration: pushes the projects currently hardcoded in
 * `constants/projectsData.ts` into Sanity as `project` documents, uploading
 * each cover image from /public/projects as a Sanity image asset.
 *
 * Run:
 *   node --env-file=.env.local scripts/migrate-projects.mjs
 *
 * Needs a write token in .env.local:
 *   SANITY_API_WRITE_TOKEN=sk...
 * (Create one at sanity.io/manage -> API -> Tokens, with Editor permissions.)
 *
 * Safe to re-run: documents use deterministic ids, so a second run updates
 * the same documents rather than creating duplicates. Case study fields are
 * left untouched on re-runs — you write those in the Studio.
 */

import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID.')
  process.exit(1)
}
if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage and add it to .env.local.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Mirrors constants/projectsData.ts. `order` replaces the ad-hoc `id`
 * ordering; lower shows first.
 */
const projects = [
  {
    title: 'MyTreda',
    subtitle: 'Inventory & business management platform',
    description:
      'Full-stack business management platform I built and currently operate. Handles inventory tracking, sales records, debt management, and daily business workflows for small businesses. I designed and built everything — the Next.js frontend, the NestJS REST API, MongoDB schema, authentication system, activity tracking, and deployment pipeline. Not a side project. A running product with real users.',
    image: 'mytreda.png',
    liveDemoLink: 'https://mytreda.com',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB', 'REST API'],
    metrics: [
      '11+ Paying Customers',
      '80+ Registered Businesses',
      '1,400+ Products Tracked',
      '460+ Sales Records',
      '3,000+ Activity Logs',
    ],
    category: 'product',
    featured: true,
    order: 10,
  },
  {
    title: 'ClaimMate',
    subtitle: 'AI-powered insurance claim report generator',
    description:
      'Built the full product — Next.js frontend, Supabase backend, and an OpenRouter drafting pipeline that checks a claim for missing information and returns questions before it will write anything. Claim data is isolated per user by Postgres row-level security, and finished letters export to PDF, Word or plain text. Optimized with Next.js SSG for sub-2s load times and a 95+ Lighthouse score.',
    image: 'claimmate.png',
    liveDemoLink: 'https://getclaimmate.com',
    githubLink: 'https://github.com/tochukwunwosa/claimmate',
    technologies: ['Next.js', 'TypeScript', 'OpenRouter', 'Supabase', 'TailwindCSS'],
    metrics: [
      'Row-Level Security Isolation',
      'Gap Check Before Every Draft',
      'PDF/Word Export Pipeline',
      '95+ Lighthouse · <2s Load',
    ],
    category: 'product',
    featured: true,
    order: 20,
  },
  {
    title: 'Tech LinkUp',
    subtitle: "Event discovery platform for Nigeria's tech ecosystem",
    description:
      'Platform connecting tech professionals with events across Nigeria. Built a Supabase backend with real-time filtering, optimised database queries, and event submission workflows. Currently hosts 169 published events across in-person, virtual, and hybrid formats. Performance-first architecture with debounced API calls and virtualized lists.',
    image: 'linkup.png',
    liveDemoLink: 'https://techlinkup.xyz',
    githubLink: 'https://github.com/tochukwunwosa/linkup',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion', 'TailwindCSS'],
    metrics: [
      '169 Published Events',
      '144 In-Person · 16 Virtual · 9 Hybrid',
      'Real-time Filtering',
      'Debounced Search',
    ],
    category: 'product',
    featured: true,
    order: 30,
  },
  {
    title: 'KondoHQ',
    subtitle: 'Real estate platform — dashboard & application flow',
    description:
      'Contributed as a frontend engineer on a real estate SaaS platform. Built the user dashboard, dashboard landing page, the full flow from viewing to applying for a property, the market insights page, and both user and admin settings pages. All implemented pixel-perfect from Figma designs using Next.js and TypeScript.',
    image: 'kondohq.png',
    liveDemoLink: 'https://kondohq.com',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    metrics: [
      'User Dashboard & Landing',
      'Full Property Application Flow',
      'Market Insights Page',
      'User & Admin Settings',
    ],
    category: 'client',
    featured: false,
    order: 40,
  },
  {
    title: 'Kinplus Technologies',
    subtitle: 'Corporate website for engineering & construction firm',
    description:
      'Modern corporate website with headless CMS integration for easy content management. Achieved 98+ PageSpeed through image optimization, lazy loading, and lean component architecture.',
    image: 'kinplus-mock-666x375.png',
    liveDemoLink: 'https://www.kinplusgroup.com',
    technologies: ['React', 'TailwindCSS', 'Hygraph CMS'],
    metrics: ['98+ PageSpeed', '< 1.5s Load Time', 'Mobile-First'],
    category: 'client',
    featured: false,
    order: 50,
  },
]

async function uploadCover(filename, title) {
  const filePath = path.join(process.cwd(), 'public', 'projects', filename)
  const buffer = await readFile(filePath)
  const asset = await client.assets.upload('image', buffer, { filename })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: `Screenshot of ${title}`,
  }
}

async function run() {
  for (const project of projects) {
    const slug = slugify(project.title)
    const _id = `project-${slug}`

    const existing = await client.getDocument(_id).catch(() => null)

    let mainImage = existing?.mainImage
    if (!mainImage) {
      process.stdout.write(`Uploading cover for ${project.title}... `)
      mainImage = await uploadCover(project.image, project.title)
      console.log('done')
    }

    const doc = {
      _id,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: slug },
      subtitle: project.subtitle,
      description: project.description,
      mainImage,
      category: project.category,
      featured: project.featured,
      order: project.order,
      liveDemoLink: project.liveDemoLink,
      technologies: project.technologies,
      metrics: project.metrics,
      // Preserved on re-run so Studio edits are not clobbered.
      hasCaseStudy: existing?.hasCaseStudy ?? false,
    }

    if (project.githubLink) doc.githubLink = project.githubLink

    await client.createOrReplace({ ...existing, ...doc })
    console.log(`${existing ? 'Updated' : 'Created'} ${_id}`)
  }

  console.log(
    `\n${projects.length} projects in Sanity. Open /studio to write the case studies.`,
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
