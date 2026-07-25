import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      description: 'Choose which Lucide icon to display (e.g., Palette, Video, Zap, Building2)',
      type: 'string',
      options: {
        list: [
          { title: 'Palette (Graphic Design)', value: 'Palette' },
          { title: 'Video (Video Editing)', value: 'Video' },
          { title: 'Zap (Motion Graphics)', value: 'Zap' },
          { title: 'Building2 (Brand Identity)', value: 'Building2' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
