import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'caseStudy', title: 'Case study' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ---------------------------------------------------------------- card
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'card',
      description: 'One line under the title. e.g. "Inventory & business management platform"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Card description',
      type: 'text',
      rows: 4,
      group: 'card',
      description: 'The paragraph shown on the homepage card and the projects index.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      group: 'card',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'card',
      options: {
        list: [
          { title: 'Personal product', value: 'product' },
          { title: 'Client work', value: 'client' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'product',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'card',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'card',
      description: 'Lower numbers show first.',
      initialValue: 100,
    }),
    defineField({
      name: 'liveDemoLink',
      title: 'Live URL',
      type: 'url',
      group: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub URL',
      type: 'url',
      group: 'card',
    }),
    defineField({
      name: 'technologies',
      title: 'Technology tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'card',
      description:
        'Short tags for the card. The reasoned breakdown lives in the case study stack.',
    }),
    defineField({
      name: 'metrics',
      title: 'Card highlights',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'card',
      description: 'Short proof points shown with a check on the card.',
    }),

    // ---------------------------------------------------------- case study
    defineField({
      name: 'hasCaseStudy',
      title: 'Publish a case study',
      type: 'boolean',
      group: 'caseStudy',
      initialValue: false,
      description:
        'Off means the card links straight to the live site. Not every project earns a case study — three strong ones beat six thin ones.',
    }),
    defineField({
      name: 'role',
      title: 'Your role',
      type: 'string',
      group: 'caseStudy',
      description:
        'Be exact. "Solo — product, frontend, API, deploy" or "Frontend engineer, 4-person team".',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'caseStudy',
      description: 'e.g. "Mar 2025 – present" or "6 weeks".',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'caseStudy',
      description: 'e.g. "Live, in active use" or "Shipped and handed over".',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'richText',
      group: 'caseStudy',
      description: 'What it is and who it is for. Two or three paragraphs.',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'problem',
      title: 'The problem',
      type: 'richText',
      group: 'caseStudy',
      description: 'The concrete situation before the work existed.',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'stack',
      title: 'Tech stack',
      type: 'array',
      of: [{ type: 'stackItem' }],
      group: 'caseStudy',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'decisions',
      title: 'Key decisions',
      type: 'array',
      group: 'caseStudy',
      description:
        'Two or three architecture or product calls, each with the tradeoff behind it.',
      of: [
        {
          type: 'object',
          name: 'decision',
          fields: [
            defineField({
              name: 'title',
              title: 'Decision',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'body', title: 'Reasoning', type: 'richText' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'richText',
      group: 'caseStudy',
      description: 'One real problem that took work, and how you solved it.',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      group: 'caseStudy',
      description: 'Quantified results, rendered as a stat row.',
      of: [
        {
          type: 'object',
          name: 'outcome',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "80+", "65 to 92", "<2s"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Registered businesses"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'richText',
      group: 'caseStudy',
      description: 'What shipping it actually changed.',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'retrospective',
      title: 'What I would do differently',
      type: 'richText',
      group: 'caseStudy',
      description: 'The section that separates an engineer from a portfolio.',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Case study published at',
      type: 'datetime',
      group: 'caseStudy',
      hidden: ({ document }) => !document?.hasCaseStudy,
    }),

    // ----------------------------------------------------------------- seo
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mainImage',
      hasCaseStudy: 'hasCaseStudy',
    },
    prepare({ title, subtitle, media, hasCaseStudy }) {
      const marker = hasCaseStudy ? 'Case study — ' : ''
      return {
        title,
        subtitle: marker + (subtitle ?? ''),
        media,
      }
    },
  },
})
