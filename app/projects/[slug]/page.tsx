import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Briefcase, CalendarClock, Activity } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import type { Project, StackItem } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from '@/components/portable-text'

export const revalidate = 60

const BASE_URL = 'https://tochukwu-nwosa.vercel.app'

const STACK_GROUPS: { key: StackItem['category']; title: string }[] = [
  { key: 'frontend', title: 'Frontend' },
  { key: 'backend', title: 'Backend' },
  { key: 'data', title: 'Data' },
  { key: 'infra', title: 'Infrastructure' },
  { key: 'tooling', title: 'Tooling' },
]

function hasBlocks(blocks?: PortableTextBlock[]) {
  return Array.isArray(blocks) && blocks.length > 0
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(projectSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const project: Project = await client.fetch(projectBySlugQuery, { slug })
    if (!project) return {}

    const ogImage = project.mainImage
      ? urlFor(project.mainImage).width(1200).height(630).url()
      : null

    const metaTitle = project.seo?.metaTitle || `${project.title} — Case Study`
    const metaDescription = project.seo?.metaDescription || project.description

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: project.technologies,
      alternates: {
        canonical: `/projects/${slug}`,
      },
      robots: project.seo?.noindex ? { index: false, follow: false } : undefined,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `/projects/${slug}`,
        type: 'article',
        publishedTime: project.publishedAt,
        images: ogImage
          ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        creator: '@tochukwudev',
        title: metaTitle,
        description: metaDescription,
        images: ogImage ? [ogImage] : [],
      },
    }
  } catch {
    return {}
  }
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-12 first:pt-0">
      <h2 className="text-2xl font-bold tracking-tight mb-5">{title}</h2>
      {children}
    </section>
  )
}

function StackTable({ stack }: { stack: StackItem[] }) {
  const groups = STACK_GROUPS.map((group) => ({
    ...group,
    items: stack.filter((item) => item.category === group.key),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.key}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-3">
            {group.title}
          </h3>
          <ul className="space-y-3">
            {group.items.map((item, i) => (
              <li
                key={item._key ?? `${item.name}-${i}`}
                className="rounded-lg border border-foreground/10 bg-foreground/[0.02] px-4 py-3"
              >
                <p className="font-mono text-sm font-semibold">{item.name}</p>
                {item.why && (
                  <p className="text-sm text-foreground/65 leading-relaxed mt-1.5">
                    {item.why}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let project: Project | null = null
  try {
    const { slug } = await params
    project = await client.fetch(projectBySlugQuery, { slug })
  } catch {
    notFound()
  }

  // Projects without a published case study have no page of their own.
  if (!project || !project.hasCaseStudy) notFound()

  const coverUrl = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(630).url()
    : null

  const hasStack = Array.isArray(project.stack) && project.stack.length > 0
  const hasDecisions = Array.isArray(project.decisions) && project.decisions.length > 0
  const hasOutcomes = Array.isArray(project.outcomes) && project.outcomes.length > 0

  const sections = [
    hasBlocks(project.overview) && { id: 'overview', title: 'Overview' },
    hasBlocks(project.problem) && { id: 'problem', title: 'The problem' },
    hasStack && { id: 'stack', title: 'Tech stack' },
    hasDecisions && { id: 'decisions', title: 'Key decisions' },
    hasBlocks(project.challenges) && { id: 'challenges', title: 'Challenges' },
    hasBlocks(project.results) && { id: 'results', title: 'Results' },
    hasBlocks(project.retrospective) && {
      id: 'retrospective',
      title: 'What I would do differently',
    },
  ].filter(Boolean) as { id: string; title: string }[]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — Case Study`,
    description: project.description,
    image: coverUrl,
    datePublished: project.publishedAt,
    dateModified: project._updatedAt,
    url: `${BASE_URL}/projects/${project.slug.current}`,
    about: {
      '@type': 'SoftwareApplication',
      name: project.title,
      url: project.liveDemoLink,
      applicationCategory: 'WebApplication',
    },
    author: {
      '@type': 'Person',
      name: 'Tochukwu Nwosa',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Tochukwu Nwosa',
      url: BASE_URL,
    },
  })
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  const metaItems = [
    project.role && { icon: Briefcase, label: 'Role', value: project.role },
    project.timeline && { icon: CalendarClock, label: 'Timeline', value: project.timeline },
    project.status && { icon: Activity, label: 'Status', value: project.status },
  ].filter(Boolean) as { icon: typeof Briefcase; label: string; value: string }[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Projects
            </Link>
          </div>

          {/* Category */}
          <div className="mb-5">
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-foreground/5 text-foreground/70 rounded border border-foreground/10 uppercase tracking-wide">
              {project.category === 'product' ? 'Personal Project' : 'Client Work'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8">{project.subtitle}</p>

          {/* Cover image */}
          {coverUrl && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5 mb-8 border border-foreground/10">
              <Image
                src={coverUrl}
                alt={project.mainImage?.alt || project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Role / timeline / status */}
          {metaItems.length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b border-foreground/10 mb-8">
              {metaItems.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-foreground/45 mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-foreground/85">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event={`case-study:live:${project.title}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit live site
            </Link>
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event={`case-study:github:${project.title}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-foreground/15 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                Source
              </Link>
            )}
          </div>

          {/* Outcomes */}
          {hasOutcomes && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-6 rounded-xl border border-foreground/10 bg-foreground/[0.02]">
              {project.outcomes!.map((outcome, i) => (
                <div key={outcome._key ?? i}>
                  <p className="text-2xl font-bold tracking-tight">{outcome.value}</p>
                  <p className="text-xs text-foreground/55 mt-1 leading-snug">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Jump nav */}
          {sections.length > 2 && (
            <nav
              aria-label="Case study sections"
              className="flex flex-wrap gap-x-4 gap-y-2 py-5 border-b border-foreground/10 mb-2"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-foreground/55 hover:text-primary transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          )}

          {/* Body */}
          <div className="prose-content">
            {hasBlocks(project.overview) && (
              <Section id="overview" title="Overview">
                <PortableText value={project.overview!} components={portableTextComponents} />
              </Section>
            )}

            {hasBlocks(project.problem) && (
              <Section id="problem" title="The problem">
                <PortableText value={project.problem!} components={portableTextComponents} />
              </Section>
            )}

            {hasStack && (
              <Section id="stack" title="Tech stack">
                <StackTable stack={project.stack!} />
              </Section>
            )}

            {hasDecisions && (
              <Section id="decisions" title="Key decisions">
                <div className="space-y-8">
                  {project.decisions!.map((decision, i) => (
                    <div
                      key={decision._key ?? i}
                      className="border-l-2 border-primary/40 pl-5"
                    >
                      <h3 className="text-lg font-semibold mb-2">{decision.title}</h3>
                      {hasBlocks(decision.body) && (
                        <PortableText
                          value={decision.body!}
                          components={portableTextComponents}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {hasBlocks(project.challenges) && (
              <Section id="challenges" title="Challenges">
                <PortableText value={project.challenges!} components={portableTextComponents} />
              </Section>
            )}

            {hasBlocks(project.results) && (
              <Section id="results" title="Results">
                <PortableText value={project.results!} components={portableTextComponents} />
              </Section>
            )}

            {hasBlocks(project.retrospective) && (
              <Section id="retrospective" title="What I would do differently">
                <PortableText
                  value={project.retrospective!}
                  components={portableTextComponents}
                />
              </Section>
            )}
          </div>

          {/* Bottom back link */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
