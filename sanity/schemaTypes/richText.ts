import { defineArrayMember, defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * Shared rich-text array used by the case study sections.
 * Mirrors the block config in `post.body` so both render through the
 * same PortableText components in `components/portable-text.tsx`.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              }),
              defineField({
                name: 'blank',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineArrayMember({
      type: 'code',
      options: {
        withFilename: true,
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JSX/TSX', value: 'tsx' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'Python', value: 'python' },
          { title: 'PowerShell', value: 'powershell' },
        ],
      },
    }),
    defineArrayMember({ type: 'table' }),
  ],
})
