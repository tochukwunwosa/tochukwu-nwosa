import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description:
        'Overrides the page title in search results and browser tabs. Falls back to the post title.',
      validation: (Rule) =>
        Rule.max(60).warning('Longer titles may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      description: 'Overrides the excerpt for search results and social previews.',
      validation: (Rule) =>
        Rule.max(160).warning('Longer descriptions may be truncated in search results.'),
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Adds a noindex directive so this post is excluded from search results.',
      initialValue: false,
    }),
  ],
})
