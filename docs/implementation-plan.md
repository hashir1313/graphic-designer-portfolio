# Sanity CMS Integration Plan

## Overview
Integrate Sanity CMS into the graphic designer portfolio to make content editable through Sanity Studio. **Studio is embedded at `/studio` path within Next.js app** (not a separate process).

---

## Phase 1: Foundation & Setup

### 1.1 Install Dependencies
```bash
npm install sanity @sanity/image-url @sanity/next-loader @sanity/ui next-sanity
npm install -D @sanity/eslint-config-studio
```

### 1.2 Initialize Sanity Project
```bash
npx sanity@latest init
```
- Create project in Sanity.io dashboard
- Configure dataset (production)
- Get Project ID and Dataset name

### 1.3 Environment Configuration
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token (for preview mode)
SANITY_STUDIO_URL=/studio
```

### 1.4 Create Sanity Client Library
**File:** `lib/sanity/client.ts`
- Configure createClient with project ID, dataset, API version
- Export `client` (server) and `previewClient` (draft mode)

**File:** `lib/sanity/image.ts`
- Export `urlFor` helper for image optimization

---

## Phase 2: Schema Definition (Studio)

### 2.1 Create Schema Files
**Directory:** `sanity/schemaTypes/`

| File | Purpose |
|------|---------|
| `index.ts` | Export all schemas |
| `heroSettings.ts` | Singleton - Hero section content |
| `aboutSettings.ts` | Singleton - About section content |
| `contactSettings.ts` | Singleton - Contact section content |
| `siteSettings.ts` | Singleton - Global settings (SEO, nav, footer) |
| `service.ts` | Document - Individual service |
| `project.ts` | Document - Individual project |
| `socialLink.ts` | Document - Social media links |

### 2.2 Define Schemas
See `docs/schema.md` for detailed schema definitions.

### 2.3 Configure Studio
**File:** `sanity.config.ts`
- Register schemas
- Configure plugins (structure tool, vision tool)
- Set up singleton actions for settings documents
- Set `basePath: '/studio'` for embedded studio

### 2.4 Add Desk Structure
**File:** `sanity/structure.ts`
- Group settings under "Site Settings" menu
- Group content under "Content" menu
- Use `S.documentTypeListItem` for repeatable types
- Use `S.documentTypeListItem` with `id` for singletons

---

## Phase 3: Embed Sanity Studio in Next.js

### 3.1 Create Studio Route
**File:** `app/studio/[[...tool]]/page.tsx`
```tsx
import dynamic from 'next/dynamic';

const Studio = dynamic(() => import('sanity/next/studio').then(m => m.Studio), {
  ssr: false,
  loading: () => <div>Loading Studio...</div>,
});

export default function StudioPage() {
  return <Studio />;
}
```

### 3.2 Configure Studio Config for Embedding
**File:** `sanity.config.ts`
```typescript
export default defineConfig({
  // ... other config
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  // ...
});
```

### 3.3 Add Studio Environment Variables
Ensure these are in `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_URL=/studio
```

---

## Phase 4: Data Fetching & Integration

### 4.1 Create Query Library
**File:** `lib/sanity/queries.ts`
- GROQ queries for each singleton
- GROQ queries for services, projects, social links
- Image projections with `asset->{_id, url, metadata}`

### 4.2 Create Data Fetching Hooks/Functions
**File:** `lib/sanity/data.ts`
- `getHeroSettings()` - Fetch hero data
- `getAboutSettings()` - Fetch about data
- `getServices()` - Fetch all services
- `getProjects()` - Fetch all projects
- `getContactSettings()` - Fetch contact data
- `getSiteSettings()` - Fetch global settings
- `getSocialLinks()` - Fetch social links

### 4.3 Add Preview Mode Support
- Create `app/api/draft-mode/route.ts` for enabling preview
- Create `app/api/draft-mode/disable/route.ts` for disabling
- Update `sanity.config.ts` with preview secret

---

## Phase 5: Component Integration

### 5.1 Hero Component (`app/components/Hero.tsx`)
- Replace hardcoded name, headline, subtitle with Sanity data
- Replace skills array with Sanity data
- Replace profile image with Sanity image
- Replace background video with Sanity asset

### 5.2 About Component (`app/components/About.tsx`)
- Add profile image field to schema (currently missing)
- Replace "About Me" headline with Sanity data
- Replace bio paragraphs with Sanity portable text or array
- Use Sanity image for profile picture

### 5.3 Services Component (`app/components/Services.tsx`)
- Replace static `services` array with Sanity data
- Map Sanity services to existing component structure
- Use `urlFor` for optimized images
- Keep animations intact

### 5.4 Projects Component (`app/components/Projects.tsx`)
- Replace static `projects` array with Sanity data
- Add external URL field to project schema
- Map categories from Sanity
- Use `urlFor` for optimized images
- Keep hover effects and animations

### 5.5 Contact Component (`app/components/Contact.tsx`)
- Replace headline, subtitle with Sanity data
- Replace email with Sanity data
- Replace location with Sanity data
- Replace map embed URL with Sanity data

### 5.6 Header Component (`app/components/Header.tsx`)
- Fetch navigation links from siteSettings
- Fetch logo from siteSettings (or keep static)

### 5.7 Footer Component (`app/components/Footer.tsx`)
- Fetch copyright text from siteSettings
- Fetch social links from Sanity
- Fetch contact info from siteSettings/contactSettings

### 5.8 Layout/Metadata (`app/layout.tsx`, `app/page.tsx`)
- Fetch SEO metadata from siteSettings
- Dynamic metadata generation

---

## Phase 6: Image Optimization & Performance

### 6.1 Configure Next.js Image Domains
**File:** `next.config.ts`
- Add Sanity CDN domain to `images.remotePatterns`

### 6.2 Implement Image Loading
- Use `next/image` with `urlFor` builder
- Configure proper `sizes` attributes
- Add blur placeholders using LQIP

### 6.3 Configure ISR/Revalidation
- Set `next: { revalidate: 60 }` on fetch requests
- Or use webhook-based revalidation

---

## Phase 7: Studio Customization (Optional)

### 7.1 Custom Input Components
- Color picker for brand colors
- Custom icon selector for services (using sanity-plugin-icon-picker)
- Video player for hero background

### 7.2 Document Actions
- Publish/unpublish for projects
- Duplicate service/project

### 7.3 Previews
- Configure `@sanity/preview-url-secret` for live preview
- Add preview pane for hero, services, projects

---

## Phase 8: Testing & Deployment

### 8.1 Local Testing
- Run `npm run dev` (single command - studio at `/studio`)
- Test all components with Sanity data
- Test preview mode
- Test image loading

### 8.2 Deploy Website
- Deploy to Vercel
- Add environment variables in Vercel dashboard
- Configure webhook for ISR revalidation
- Studio automatically available at `your-domain.com/studio`

### 8.3 Content Population
- Create initial content in Sanity Studio at `/studio`
- Add images for all services and projects
- Configure SEO metadata

---

## Phase 9: Maintenance

### 9.1 Content Workflow
- Draft → Review → Publish workflow
- Scheduled publishing for projects

### 9.2 Monitoring
- Sanity usage dashboard
- Vercel analytics
- Error tracking

---

## File Structure Summary

```
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── heroSettings.ts
│   │   ├── aboutSettings.ts
│   │   ├── contactSettings.ts
│   │   ├── siteSettings.ts
│   │   ├── service.ts
│   │   ├── project.ts
│   │   └── socialLink.ts
│   ├── structure.ts
│   └── sanity.config.ts
├── lib/
│   └── sanity/
│       ├── client.ts
│       ├── image.ts
│       ├── queries.ts
│       └── data.ts
├── app/
│   ├── api/
│   │   └── draft-mode/
│   │       ├── route.ts
│   │       └── disable/route.ts
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   └── components/ (updated)
└── docs/
    ├── implementation-plan.md
    └── schema.md
```

---

## Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: Foundation | 1-2 hours |
| Phase 2: Schemas | 2-3 hours |
| Phase 3: Embed Studio | 1 hour |
| Phase 4: Data Fetching | 1-2 hours |
| Phase 5: Component Integration | 3-4 hours |
| Phase 6: Images & Performance | 1 hour |
| Phase 7: Studio Customization | 1-2 hours (optional) |
| Phase 8: Testing & Deploy | 1-2 hours |
| **Total** | **11-17 hours** |

---

## Key Differences: Embedded Studio vs Standalone

| Aspect | Embedded (`/studio`) | Standalone (`npx sanity dev`) |
|--------|---------------------|-------------------------------|
| **Dev Command** | `npm run dev` only | `npm run dev` + `npx sanity dev` |
| **Studio URL** | `localhost:3000/studio` | `localhost:3333` |
| **Deployment** | Deploys with Next.js to Vercel | Separate deploy to `sanity.studio` |
| **Auth** | Uses Sanity auth in iframe | Own auth flow |
| **Preview** | Same origin, easier preview | Cross-origin, needs config |
| **Environment** | Shares Next.js env vars | Separate `.env` for studio |