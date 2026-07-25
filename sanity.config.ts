import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1w6tyacl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            // Singleton profile settings
            S.listItem()
              .title('Profile Settings')
              .id('profileSettings')
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('profile')
              ),
            S.divider(),
            // Other regular document types (except profile, as it is handled above)
            ...S.documentTypeListItems().filter(
              (item) => !['profile'].includes(item.getId()!)
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
