import { defineArrayMember, defineField, defineType } from 'sanity'

export const table = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tableRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              return { title: Array.isArray(cells) ? cells.join(' | ') : 'Row' }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { rows: 'rows' },
    prepare({ rows }) {
      return {
        title: 'Table',
        subtitle: `${rows?.length ?? 0} row(s)`,
      }
    },
  },
})
