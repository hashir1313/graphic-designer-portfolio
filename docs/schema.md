# Sanity Schema Definitions

## Overview
All schemas written in simple TypeScript-like syntax for easy understanding. Each schema maps to a Sanity document type.

---

## Singleton Documents (One per site)

### 1. `heroSettings` — Hero Section
**Only one exists for the entire site.**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | "Prakash" |
| `headline` | string | "Graphic Designer & Video Editor" |
| `subtitle` | string | "Crafting visual stories that inspire and engage" |
| `skills` | array of strings | ["Graphic Design", "Video Editing", "Motion Graphics", "Brand Identity"] |
| `profileImage` | image | Profile photo in hero card |
| `backgroundVideo` | file (video) | Hero background video (MP4) |
| `ctaPrimaryText` | string | "View My Work" |
| `ctaPrimaryHref` | string | "#projects" |
| `ctaSecondaryText` | string | "Get In Touch" |
| `ctaSecondaryHref` | string | "#contact" |

---

### 2. `aboutSettings` — About Section
**Only one exists for the entire site.**

| Field | Type | Description |
|-------|------|-------------|
| `headline` | string | "About Me" |
| `profileImage` | image | Profile photo (NEW - currently missing in code) |
| `bio` | array of blocks (portable text) | Rich text biography (2 paragraphs) |
| `ctaText` | string | "View My Work" |
| `ctaHref` | string | "#projects" |

---

### 3. `contactSettings` — Contact Section
**Only one exists for the entire site.**

| Field | Type | Description |
|-------|------|-------------|
| `headline` | string | "Let's Work Together" |
| `subtitle` | string | "Have a project in mind? I'd love to hear about it." |
| `email` | string | "prakash@example.com" |
| `location` | string | "Surat, Gujarat, India" |
| `mapEmbedUrl` | url | Google Maps embed iframe URL |
| `ctaText` | string | "Start a Project" |
| `ctaHref` | string | "mailto:prakash@example.com" |

---

### 4. `siteSettings` — Global Site Settings
**Only one exists for the entire site.**

| Field | Type | Description |
|-------|------|-------------|
| `siteName` | string | "Prakash Katariya Studio" |
| `siteUrl` | url | "https://prakashkatariya.com" |
| `logo` | image | Logo image (optional, fallback to text) |
| `logoText` | string | "PK" (fallback text logo) |
| `navigation` | array of navItems | Header navigation links |
| `footerCopyright` | string | "© 2025 Prakash® Studio" |
| `seo` | seoFields | Global SEO defaults |

#### `navItem` (object inside navigation array)
| Field | Type | Description |
|-------|------|-------------|
| `label` | string | "About" |
| `href` | string | "#about" |

#### `seoFields` (object)
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Default page title |
| `description` | string | Default meta description |
| `ogImage` | image | Default Open Graph image |
| `twitterHandle` | string | "@prakashdesign" |

---

## Repeatable Documents (Multiple entries)

### 5. `service` — Service Offering
**Create multiple. Displayed in Services section grid.**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | "Graphic Design" |
| `description` | text (portable text) | Rich text description |
| `image` | image | Service showcase image |
| `icon` | iconPicker (via sanity-plugin-icon-picker) | Lucide icon picker: search and select any Lucide icon |
| `features` | array of strings | ["Logo Design", "Brand Identity", "Print Design", "Digital Graphics"] |
| `order` | number | Display order (1, 2, 3, 4) |
| `isActive` | boolean | Show/hide from frontend |

> **Icon selection in frontend:** Use `lucide-react` icon component mapping from the icon name stored in Sanity

---

### 6. `project` — Portfolio Project
**Create multiple. Displayed in Projects section grid.**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | "Brand Identity Design" |
| `description` | text (portable text) | Rich text description |
| `category` | string | "Branding" \| "Motion Graphics" \| "Video Editing" \| "Graphic Design" \| "Video Production" |
| `image` | image | Project thumbnail |
| `externalUrl` | url | Live project link (optional) |
| `order` | number | Display order |
| `isActive` | boolean | Show/hide from frontend |

---

### 7. `socialLink` — Social Media Link
**Create multiple. Displayed in Footer and Header mobile menu.**

| Field | Type | Description |
|-------|------|-------------|
| `platform` | string | "linkedin" \| "behance" \| "dribbble" \| "instagram" \| "twitter" \| "github" \| "email" |
| `url` | url | "https://linkedin.com/in/prakash" |
| `label` | string | "LinkedIn" (display text) |
| `icon` | iconPicker (via sanity-plugin-icon-picker) | Lucide icon picker for platform icon |
| `order` | number | Display order |
| `isActive` | boolean | Show/hide |

---

## Reusable Objects (Embedded in other schemas)

### `seoFields` — SEO Metadata Object
Used in `siteSettings` and can be added to `project`/`service` for per-page SEO.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Page title |
| `description` | text | Meta description |
| `ogImage` | image | Open Graph image |
| `noIndex` | boolean | Prevent indexing |
| `noFollow` | boolean | Prevent following links |

---

## Sanity Icon Picker Plugin Setup

### Installation
```bash
npm install sanity-plugin-icon-picker
```

### Configuration in `sanity.config.ts`
```typescript
import { iconPicker } from 'sanity-plugin-icon-picker';

export default defineConfig({
  // ... other config
  plugins: [
    // ... other plugins
    iconPicker({
      // Optional: restrict to specific icon sets
      // Default includes: lucide, material, fontawesome, etc.
      // For Lucide only:
      // iconSets: ['lucide'],
    }),
  ],
});
```

### Schema Usage
In your schema (e.g., `service.ts`):
```typescript
{
  name: 'icon',
  title: 'Icon',
  type: 'iconPicker',
  options: {
    // Optional: limit to specific icon sets
    // iconSets: ['lucide'],
  },
}
```

### Frontend Usage
```typescript
import * as LucideIcons from 'lucide-react';

// In your component, convert icon name to component
const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons];

// Render
<IconComponent className="w-8 h-8" />
```

### Stored Data Format
The icon picker stores an object:
```json
{
  "_type": "iconPicker",
  "name": "palette",
  "prefix": "lucide"
}
```

### Query Projection (GROQ)
```groq
*[_type == "service"] {
  title,
  icon { name, prefix }
}
```

### Frontend Helper
```typescript
// lib/sanity/icons.ts
import * as LucideIcons from 'lucide-react';

export function getLucideIcon(iconName: string) {
  return LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
}
```

---

## Image Fields Configuration

All image fields should include:
```typescript
{
  type: 'image',
  options: {
    hotspot: true,        // Enable focal point cropping
    storeOriginalFilename: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Important for accessibility and SEO'
    }
  ]
}
```

---

## Portable Text (Rich Text) Configuration

For `description` in services, `bio` in about, `description` in projects:

```typescript
{
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image' },
  ],
  // Optional: limit formatting options
  // marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] }
}
```

---

## Schema Registration Order

In `sanity/schemaTypes/index.ts`:

```typescript
export const schemaTypes = [
  // Singletons first
  heroSettings,
  aboutSettings,
  contactSettings,
  siteSettings,
  
  // Repeatable types
  service,
  project,
  socialLink,
  
  // Objects (if separate files)
  seoFields,
];
```

---

## Studio Structure (Desk Tool)

```
📁 Site Settings (group)
  📄 Hero Settings (singleton)
  📄 About Settings (singleton)
  📄 Contact Settings (singleton)
  📄 Site Settings (singleton)

📁 Content (group)
  📂 Services (list)
  📂 Projects (list)
  📂 Social Links (list)
```

---

## GROQ Query Examples

### Fetch Hero Settings
```groq
*[_type == "heroSettings"][0] {
  name,
  headline,
  subtitle,
  skills,
  profileImage { asset->, alt },
  backgroundVideo { asset-> },
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref
}
```

### Fetch All Services (ordered)
```groq
*[_type == "service" && isActive == true] | order(order asc) {
  _id,
  title,
  description,
  image { asset->, alt },
  icon,
  features,
  order
}
```

### Fetch All Projects (ordered)
```groq
*[_type == "project" && isActive == true] | order(order asc) {
  _id,
  title,
  description,
  category,
  image { asset->, alt },
  gallery[] { asset->, alt },
  externalUrl,
  client,
  year,
  tools,
  featured,
  order
}
```

### Fetch Site Settings with Navigation
```groq
*[_type == "siteSettings"][0] {
  siteName,
  siteUrl,
  logo { asset->, alt },
  logoText,
  navigation[] { label, href },
  footerCopyright,
  seo { title, description, ogImage { asset-> }, twitterHandle }
}
```

### Fetch Social Links
```groq
*[_type == "socialLink" && isActive == true] | order(order asc) {
  platform,
  url,
  label,
  icon,
  order
}
```

---

## Image URL Builder Usage

```typescript
import { urlFor } from '@/lib/sanity/image';

// In components:
<Image
  src={urlFor(service.image).width(800).height(600).url()}
  alt={service.image.alt || service.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## Environment Variables Required

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_for_preview_mode
```

---

## Next Steps After Schema Creation

1. Run `npx sanity dev` to start Studio locally
2. Create the singleton documents first (Hero, About, Contact, Site Settings)
3. Add 4 Services with images and features
4. Add 6 Projects with images and details
5. Add Social Links
6. Test queries in Vision tool (`/vision` in Studio)
7. Integrate with Next.js frontend