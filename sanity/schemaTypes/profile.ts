import { defineField, defineType } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      description: 'e.g., Graphic Designer & Video Editor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'e.g., Crafting visual stories that inspire and engage',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'aboutMe1',
      title: 'About Me Paragraph 1',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutMe2',
      title: 'About Me Paragraph 2',
      type: 'text',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'e.g., Surat, Gujarat, India',
      type: 'string',
    }),
    defineField({
      name: 'resume',
      title: 'Resume / CV File',
      type: 'file',
    }),
    defineField({
      name: 'skills',
      title: 'Skills List',
      description: 'List of skills shown on Hero section',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'LinkedIn', value: 'LinkedIn' },
                  { title: 'GitHub', value: 'GitHub' },
                  { title: 'Twitter / X', value: 'Twitter' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
