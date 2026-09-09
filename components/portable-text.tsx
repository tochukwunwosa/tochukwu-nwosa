import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

/**
 * Shared PortableText renderer for blog posts and project case studies.
 * Server-safe — no hooks, no client boundary.
 */
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-foreground/5">
            <Image
              src={urlFor(value).width(1000).url()}
              alt={value.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-foreground/45 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      if (!value?.code) return null
      return (
        <div className="my-8 rounded-xl overflow-hidden bg-foreground/[0.04] border border-foreground/10">
          {value.filename && (
            <div className="px-4 py-2 text-xs font-mono text-foreground/50 border-b border-foreground/10">
              {value.filename}
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="font-mono">{value.code}</code>
          </pre>
        </div>
      )
    },
    table: ({ value }) => {
      const rows: { cells?: string[] }[] = value?.rows ?? []
      if (rows.length === 0) return null
      const [headerRow, ...bodyRows] = rows
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-foreground/10">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-foreground/[0.04]">
                {headerRow.cells?.map((cell, i) => (
                  <th key={i} className="px-4 py-2 font-semibold border-b border-foreground/10">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i} className="border-b border-foreground/10 last:border-0">
                  {row.cells?.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-foreground/80">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-12 mb-4 tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-8 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground/80">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/50 pl-5 my-8 text-foreground/65 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-foreground/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-foreground/10 text-sm font-mono text-foreground/90">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isBlank = value?.blank !== false
      return (
        <a
          href={value?.href}
          target={isBlank ? '_blank' : undefined}
          rel={isBlank ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-4 hover:text-primary/70 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}
