/**
 * Writes a case study into its existing `project` document in Sanity.
 *
 *   node --env-file=.env.local scripts/write-case-study.mjs mytreda
 *   node --env-file=.env.local scripts/write-case-study.mjs tech-linkup --markdown
 *   node --env-file=.env.local scripts/write-case-study.mjs --all --markdown
 *
 * The default run patches Sanity and needs SANITY_API_WRITE_TOKEN to be an
 * *Editor* token — a Viewer token fails with `permission "update" required`.
 * `--markdown` writes the same content to `<slug>-case-study.md` instead, for
 * pasting into the Studio by hand (the Studio has markdown paste enabled).
 *
 * Only case-study fields are touched; the card fields set by the project
 * migration are left alone.
 */

import { createClient } from '@sanity/client'
import { writeFile } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { toPatch, renderMarkdown } from './lib/portable-text.mjs'

const args = process.argv.slice(2)
const asMarkdown = args.includes('--markdown')
const all = args.includes('--all')
const slugs = args.filter((a) => !a.startsWith('--'))

const dir = path.join(process.cwd(), 'scripts', 'case-studies')

async function available() {
  const files = await readdir(dir)
  return files.filter((f) => f.endsWith('.mjs')).map((f) => f.replace(/\.mjs$/, ''))
}

const targets = all ? await available() : slugs

if (!targets.length) {
  console.error(
    `Usage: node --env-file=.env.local scripts/write-case-study.mjs <slug> [--markdown]\n` +
      `Available: ${(await available()).join(', ')}`,
  )
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

for (const slug of targets) {
  const file = path.join(dir, `${slug}.mjs`)
  const { default: content } = await import(pathToFileURL(file).href)

  if (asMarkdown) {
    const out = `${slug}-case-study.md`
    await writeFile(out, renderMarkdown(content), 'utf8')
    console.log(`Wrote ${out}`)
    continue
  }

  const result = await client.patch(content.docId).set(toPatch(content)).commit()
  console.log(`Updated ${result._id} (rev ${result._rev})`)
}
