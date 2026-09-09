/**
 * Small authoring helpers for writing case studies as Portable Text.
 *
 * Content files under scripts/case-studies/ use these to build blocks, and
 * scripts/write-case-study.mjs either commits them to Sanity or renders the
 * same content back to markdown for pasting into the Studio by hand.
 */

import { randomBytes } from 'node:crypto'

export const SITE = 'https://tochukwu-nwosa.vercel.app'

export const key = () => randomBytes(6).toString('hex')

/**
 * Mini inline parser: **bold**, `code`, [text](url).
 * Returns { children, markDefs } for a Portable Text block.
 */
function inline(text) {
  const children = []
  const markDefs = []
  const pattern = /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match

  const push = (value, marks = []) => {
    if (!value) return
    children.push({ _type: 'span', _key: key(), text: value, marks })
  }

  while ((match = pattern.exec(text)) !== null) {
    push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      push(token.slice(2, -2), ['strong'])
    } else if (token.startsWith('`')) {
      push(token.slice(1, -1), ['code'])
    } else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const defKey = key()
      markDefs.push({ _type: 'link', _key: defKey, href, blank: !href.startsWith(SITE) })
      push(label, [defKey])
    }
    last = match.index + token.length
  }
  push(text.slice(last))
  return { children, markDefs }
}

function block(text, style = 'normal') {
  const { children, markDefs } = inline(text)
  return { _type: 'block', _key: key(), style, markDefs, children }
}

export const p = (text) => block(text)
export const h3 = (text) => block(text, 'h3')
export const quote = (text) => block(text, 'blockquote')

export function bullets(items) {
  return items.map((text) => {
    const { children, markDefs } = inline(text)
    return {
      _type: 'block',
      _key: key(),
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs,
      children,
    }
  })
}

export const stackItem = (category, name, why) => ({
  _type: 'stackItem',
  _key: key(),
  name,
  category,
  why,
})

export const decision = (title, body) => ({
  _type: 'decision',
  _key: key(),
  title,
  body,
})

export const outcome = (value, label) => ({
  _type: 'outcome',
  _key: key(),
  value,
  label,
})

/* ---------------------------------------------------------------- markdown */

/** Renders blocks back to markdown so the same content can be pasted. */
export function toMarkdown(blocks = []) {
  return blocks
    .map((b) => {
      const defs = Object.fromEntries((b.markDefs ?? []).map((d) => [d._key, d]))
      const text = (b.children ?? [])
        .map((span) => {
          let out = span.text
          for (const mark of span.marks ?? []) {
            if (mark === 'strong') out = `**${out}**`
            else if (mark === 'code') out = '`' + out + '`'
            else if (defs[mark]) out = `[${out}](${defs[mark].href})`
          }
          return out
        })
        .join('')
      if (b.listItem === 'bullet') return `- ${text}`
      if (b.style === 'h3') return `\n### ${text}`
      if (b.style === 'blockquote') return `> ${text}`
      return text
    })
    .join('\n\n')
}

const GROUP_TITLES = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Data',
  infra: 'Infrastructure',
  tooling: 'Tooling',
}

export function stackToMarkdown(items) {
  return Object.entries(GROUP_TITLES)
    .map(([group, title]) => {
      const inGroup = items.filter((i) => i.category === group)
      if (!inGroup.length) return ''
      return `\n### ${title}\n\n${inGroup.map((i) => `- **${i.name}** — ${i.why}`).join('\n')}`
    })
    .filter(Boolean)
    .join('\n')
}

/**
 * Builds the Sanity patch payload from a case study content module.
 * A content file may include a `card` object to correct card-level fields
 * (description, technologies, metrics) at the same time.
 */
export function toPatch(content) {
  return {
    ...(content.card ?? {}),
    hasCaseStudy: true,
    role: content.role,
    status: content.status,
    ...(content.timeline ? { timeline: content.timeline } : {}),
    overview: content.overview,
    problem: content.problem,
    stack: content.stack,
    decisions: content.decisions,
    challenges: content.challenges,
    outcomes: content.outcomes,
    results: content.results,
    retrospective: content.retrospective,
    publishedAt: new Date().toISOString(),
    seo: { _type: 'seo', ...content.seo, noindex: false },
  }
}

export function renderMarkdown(content) {
  return `# ${content.title} — Case Study

**Role:** ${content.role}
**Status:** ${content.status}${content.timeline ? `\n**Timeline:** ${content.timeline}` : ''}

## Outcomes

${content.outcomes.map((o) => `- **${o.value}** — ${o.label}`).join('\n')}

## Overview

${toMarkdown(content.overview)}

## The problem

${toMarkdown(content.problem)}

## Tech stack
${stackToMarkdown(content.stack)}

## Key decisions
${content.decisions.map((d) => `\n### ${d.title}\n\n${toMarkdown(d.body)}`).join('\n')}

## Challenges

${toMarkdown(content.challenges)}

## Results

${toMarkdown(content.results)}

## What I would do differently

${toMarkdown(content.retrospective)}

---

**SEO meta title:** ${content.seo.metaTitle}

**SEO meta description:** ${content.seo.metaDescription}
`
}
