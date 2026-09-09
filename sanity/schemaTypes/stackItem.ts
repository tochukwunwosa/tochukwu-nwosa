import { defineField, defineType } from 'sanity'

export const STACK_CATEGORIES = [
  { title: 'Frontend', value: 'frontend' },
  { title: 'Backend', value: 'backend' },
  { title: 'Data', value: 'data' },
  { title: 'Infrastructure', value: 'infra' },
  { title: 'Tooling', value: 'tooling' },
] as const

/**
 * One entry in a case study's tech stack. The `why` is the point — a bare
 * list of tool names says nothing a reader can't guess from the screenshot.
 */
export const stackItem = defineType({
  name: 'stackItem',
  title: 'Stack item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Next.js 15 (App Router)", "MongoDB", "Vercel"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: [...STACK_CATEGORIES], layout: 'radio', direction: 'horizontal' },
      initialValue: 'frontend',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'why',
      title: 'Why this choice',
      type: 'text',
      rows: 2,
      description:
        'One or two sentences on the tradeoff. Honest beats impressive — "I would pick X today" reads as judgement, not weakness.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'why', category: 'category' },
    prepare({ title, subtitle, category }) {
      return {
        title,
        subtitle: subtitle || category,
      }
    },
  },
})
