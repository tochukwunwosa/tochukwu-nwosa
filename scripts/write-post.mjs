/**
 * Writes a blog post from scripts/posts/<name>.mjs into Sanity.
 *
 *   node --env-file=.env.local scripts/write-post.mjs mongodb-to-postgres
 *   node --env-file=.env.local scripts/write-post.mjs mongodb-to-postgres --publish
 *   node scripts/write-post.mjs mongodb-to-postgres --markdown
 *
 * The default run writes a *draft* (`drafts.post-<slug>`) for review in the
 * Studio. `--publish` writes the published document and removes the draft.
 * Both need SANITY_API_WRITE_TOKEN to be an Editor token.
 * `--markdown` writes `<slug>.md` instead, for pasting into the Studio.
 *
 * If the post has a `cover`, the image is uploaded and set as `mainImage`
 * (Sanity dedupes identical uploads, so re-runs don't pile up assets).
 *
 * Safe to re-run: the document id is derived from the slug.
 */

import { createClient } from '@sanity/client'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { toMarkdown } from './lib/portable-text.mjs'

const args = process.argv.slice(2)
const asMarkdown = args.includes('--markdown')
const publish = args.includes('--publish')
const [name] = args.filter((a) => !a.startsWith('--'))

const dir = path.join(process.cwd(), 'scripts', 'posts')

if (!name) {
  const files = await readdir(dir)
  console.error(
    `Usage: node --env-file=.env.local scripts/write-post.mjs <name> [--publish | --markdown]\n` +
      `Available: ${files.map((f) => f.replace(/\.mjs$/, '')).join(', ')}`,
  )
  process.exit(1)
}

const { default: post } = await import(pathToFileURL(path.join(dir, `${name}.mjs`)).href)
// bullets() and numbered() return arrays of blocks.
const body = post.body.flat()

if (asMarkdown) {
  const out = `${post.slug}.md`
  await writeFile(out, `# ${post.title}\n\n_${post.excerpt}_\n\n${toMarkdown(body)}\n`, 'utf8')
  console.log(`Wrote ${out}`)
  process.exit(0)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

let mainImage
if (post.cover) {
  const asset = await client.assets.upload('image', await readFile(path.join(dir, post.cover.file)), {
    filename: path.basename(post.cover.file),
  })
  mainImage = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: post.cover.alt,
  }
}

const id = `post-${post.slug}`
const doc = {
  _id: publish ? id : `drafts.${id}`,
  _type: 'post',
  title: post.title,
  slug: { _type: 'slug', current: post.slug },
  publishedAt: post.publishedAt,
  excerpt: post.excerpt,
  tags: post.tags,
  estimatedReadTime: post.estimatedReadTime,
  seo: { _type: 'seo', ...post.seo, noindex: false },
  body,
  ...(mainImage ? { mainImage } : {}),
}

const tx = client.transaction().createOrReplace(doc)
if (publish) tx.delete(`drafts.${id}`)
await tx.commit()

console.log(`${publish ? 'Published' : 'Saved draft'} ${doc._id}`)
