# Saunas Plus - System Architecture

**Last Updated:** January 2025

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
├─────────────────────────────────────────────────────────────┤
│  React SPA (Vite)                                           │
│  - React Router (Client-side routing)                       │
│  - TanStack Query (Data fetching/caching)                   │
│  - Tailwind CSS (Styling)                                   │
│  - shadcn/ui (Component library)                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTPS
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Lovable Cloud                             │
│              (Supabase Infrastructure)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │   PostgreSQL   │  │  Edge Functions │  │   Storage    ││
│  │    Database    │  │   (Deno)        │  │   Buckets    ││
│  └────────────────┘  └─────────────────┘  └──────────────┘│
│                                                              │
│  ┌────────────────┐  ┌─────────────────┐                   │
│  │  Auth Service  │  │   Realtime      │                   │
│  │  (JWT-based)   │  │   WebSockets    │                   │
│  └────────────────┘  └─────────────────┘                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ API Calls
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  External Services                           │
├─────────────────────────────────────────────────────────────┤
│  - Lovable AI (Gemini 2.5 Flash, GPT-5)                    │
│  - Imagen API (Image generation)                            │
│  - Resend (Email delivery)                                  │
│  - Google Analytics 4                                        │
│  - Google Tag Manager                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Technology Stack

### Frontend Layer

#### Core Framework
- **React 18.3.1**
  - Hooks-based architecture
  - Functional components
  - Context API for global state
  - No Redux (keeping state local where possible)

#### Build Tool
- **Vite 5.x**
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Plugin ecosystem
  - Environment variable management

#### Routing
- **React Router 6.30.1**
  - Client-side routing
  - Lazy loading routes
  - Protected route wrappers
  - Breadcrumb generation

#### State Management
- **TanStack Query 5.83.0** (formerly React Query)
  - Server state caching
  - Automatic refetching
  - Optimistic updates
  - Request deduplication
  - Background sync

#### Styling
- **Tailwind CSS 3.x**
  - Utility-first CSS
  - Custom design tokens
  - JIT (Just-In-Time) compilation
  - Responsive design utilities
  - Dark mode support via `next-themes`

#### Component Library
- **shadcn/ui**
  - Radix UI primitives
  - Accessible by default
  - Customizable components
  - Copy-paste approach (not npm package)

#### Form Handling
- **React Hook Form 7.61.1**
  - Performant form validation
  - Minimal re-renders
  - Zod schema integration
  - Error handling

#### Markdown Rendering
- **react-markdown 10.1.0**
  - Safe HTML rendering
  - GFM (GitHub Flavored Markdown)
  - Custom component mapping

### Backend Layer (Lovable Cloud / Supabase)

#### Database
- **PostgreSQL 15.x**
  - Relational data storage
  - ACID compliance
  - Row Level Security (RLS)
  - Full-text search
  - JSON support

#### Serverless Functions
- **Edge Functions (Deno Runtime)**
  - TypeScript support
  - Fast cold starts
  - Global distribution
  - Environment variables

#### Authentication
- **Supabase Auth**
  - JWT-based authentication
  - Email/password login
  - Role-based access control
  - Session management
  - Refresh token rotation

#### File Storage
- **Supabase Storage**
  - S3-compatible API
  - CDN integration
  - Access policies
  - Image transformation (future)

#### Realtime (Not Currently Used)
- **Supabase Realtime**
  - WebSocket connections
  - Database change subscriptions
  - Presence (future)

### External Integrations

#### AI Services
- **Lovable AI Gateway**
  - Access to Gemini 2.5 Flash
  - Access to GPT-5 models
  - Unified API
  - Pre-configured in Supabase

- **Imagen API**
  - AI image generation
  - Used in blog generation

#### Email
- **Resend API**
  - Transactional emails
  - Form notifications
  - Newsletter delivery (future)

#### Analytics
- **Google Analytics 4**
  - User behavior tracking
  - Conversion tracking
  - Custom events
  - Enhanced measurement

- **Google Tag Manager**
  - Tag management
  - Event tracking
  - Third-party integrations
  - A/B testing (future)

#### Forms (Backup)
- **Formspree**
  - Fallback form handling
  - Spam protection
  - Email notifications

### Progressive Web App

#### Service Worker
- **Workbox 7.3.0**
  - Caching strategies
  - Offline support
  - Background sync (future)
  - Push notifications (future)

#### PWA Manifest
- **vite-plugin-pwa 1.1.0**
  - Auto-generated manifest
  - Icon generation
  - Update prompts

---

## 🗂️ Project Structure

```
saunas-plus/
├── docs/                          # Documentation (NEW)
│   ├── GAME_PLAN.md              # Master game plan
│   ├── PRIORITIES.md             # Priority roadmap
│   ├── AUDIT_CHECKLIST.md        # Code audit checklist
│   ├── OPTIMIZATION_NOTES.md     # Optimization tracking
│   ├── FEATURES_STATUS.md        # Feature inventory
│   ├── ARCHITECTURE.md           # This file
│   ├── DATABASE_SCHEMA.md        # Database structure
│   ├── TECHNICAL_DEBT.md         # Known issues
│   └── MAINTENANCE_SCHEDULE.md   # Recurring tasks
│
├── public/                        # Static assets
│   ├── robots.txt                # SEO crawling rules
│   ├── sitemap.xml               # Auto-generated sitemap
│   ├── pwa-icon-192.png          # PWA icon
│   └── pwa-icon-512.png          # PWA icon (large)
│
├── src/                          # Source code
│   ├── assets/                   # Images, fonts
│   │   ├── hero-sauna.jpg
│   │   ├── luxury-sauna.jpg
│   │   └── ...
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── lazy-image.tsx   # Custom lazy loading
│   │   │   └── ...
│   │   │
│   │   ├── navigation/           # Nav components
│   │   │   ├── CleanNavbar.tsx
│   │   │   ├── DesktopNav.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── navigation-data.ts
│   │   │
│   │   ├── seo/                  # SEO components
│   │   │   ├── StructuredData.tsx
│   │   │   ├── ArticleSchema.tsx
│   │   │   ├── ServiceSchema.tsx
│   │   │   └── ...
│   │   │
│   │   ├── admin/                # Admin components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/               # Shared components
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── ...                   # Feature components
│   │
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Home page
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   │
│   │   ├── services/             # Service detail pages
│   │   │   ├── CustomSaunaDesign.tsx
│   │   │   ├── CustomSaunaInstallation.tsx
│   │   │   └── ...
│   │   │
│   │   ├── health-benefits/      # Health benefit pages
│   │   │   ├── Cardiovascular.tsx
│   │   │   ├── MuscleRecovery.tsx
│   │   │   └── ...
│   │   │
│   │   └── admin/                # Admin pages
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── BlogPosts.tsx
│   │       ├── BlogEditor.tsx
│   │       ├── Gallery.tsx
│   │       └── ...
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAdminAuth.tsx
│   │   ├── useContactForm.tsx
│   │   ├── useGalleryUpload.tsx
│   │   ├── useNewsletterSignup.tsx
│   │   └── ...
│   │
│   ├── utils/                    # Utility functions
│   │   ├── analytics.ts          # GTM/GA4 helpers
│   │   └── websiteAnalytics.ts   # Analytics data fetching
│   │
│   ├── lib/                      # Library code
│   │   └── utils.ts              # Helper functions
│   │
│   ├── constants/                # Constants
│   │   └── gtmConfig.ts          # GTM configuration
│   │
│   ├── integrations/             # External integrations
│   │   └── supabase/
│   │       ├── client.ts         # Supabase client (auto-generated)
│   │       └── types.ts          # DB types (auto-generated)
│   │
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles + design tokens
│   └── vite-env.d.ts            # TypeScript declarations
│
├── supabase/                     # Backend configuration
│   ├── functions/                # Edge functions
│   │   ├── generate-blog/
│   │   │   └── index.ts
│   │   ├── generate-image-metadata/
│   │   │   └── index.ts
│   │   ├── check-geo-location/
│   │   │   └── index.ts
│   │   ├── generate-sitemap/
│   │   │   └── index.ts
│   │   ├── index-site-content/
│   │   │   └── index.ts
│   │   └── monitor-content-health/
│   │       └── index.ts
│   │
│   ├── migrations/               # Database migrations (auto-managed)
│   └── config.toml               # Supabase config (auto-managed)
│
├── .env                          # Environment variables (auto-managed)
├── tailwind.config.ts            # Tailwind configuration
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project readme
```

---

## 🔄 Data Flow

### User-Facing Features

#### Page Load Flow
```
1. User navigates to page
2. React Router matches route
3. Page component renders
4. TanStack Query fetches data (if needed)
5. Data cached for future requests
6. Page view tracked in GA4
7. GTM events fire (if applicable)
```

#### Form Submission Flow
```
1. User fills form
2. React Hook Form validates
3. On submit, call Supabase insert
4. Email sent via Resend API (edge function)
5. Success toast shown
6. GTM conversion event fires
7. Admin receives notification
```

#### Blog Post View Flow
```
1. User clicks blog post
2. Route to /blog/:slug
3. TanStack Query fetches post from Supabase
4. Post rendered with react-markdown
5. Schema markup injected
6. Social share buttons loaded
7. Page view tracked
8. Related posts fetched
```

### Admin Features

#### Blog Generation Flow
```
1. Admin clicks "Generate Blog" or cron job triggers
2. Edge function invoked: generate-blog
3. Authentication checked (admin role)
4. Fetch blog generator settings
5. Fetch existing blog posts (avoid duplicates)
6. Fetch site content knowledge base
7. Call Lovable AI (Gemini) for topic
8. Call Lovable AI for research
9. Call Lovable AI for outline
10. Call Lovable AI for content
11. Call Lovable AI for fact check
12. Call Lovable AI for clarity edit
13. Call Imagen API for images (if enabled)
14. Generate SEO metadata
15. Insert post into database
16. Log generation in blog_generation_logs
17. Return success/error
```

#### Image Upload Flow
```
1. Admin uploads image to gallery
2. File uploaded to Supabase Storage (gallery-images bucket)
3. Edge function invoked: generate-image-metadata
4. AI analyzes image, generates description and alt text
5. Metadata inserted into gallery_images table
6. Success confirmation shown
```

#### Content Indexing Flow
```
1. Blog post published or updated
2. Database trigger fires
3. site_content table updated
4. Keywords extracted
5. Available for internal linking suggestions
6. Searchable in content knowledge base
```

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User enters credentials on /admin/login
2. Supabase Auth validates
3. JWT token issued
4. Token stored in localStorage
5. Token included in all API requests
6. RLS policies enforce data access
7. Admin role checked for protected routes
```

### Row Level Security (RLS)

#### Contacts Table
- **INSERT:** Allow all (form submissions)
- **SELECT:** Admin only
- **UPDATE:** Admin only
- **DELETE:** Admin only

#### Blog Posts Table
- **INSERT:** Admin only
- **SELECT:** Public (if published), Admin (all)
- **UPDATE:** Admin only
- **DELETE:** Admin only

#### Gallery Images Table
- **INSERT:** Admin only
- **SELECT:** Public (if not hidden)
- **UPDATE:** Admin only
- **DELETE:** Admin only

#### Reviews Table
- **INSERT:** Admin only
- **SELECT:** Public (if approved)
- **UPDATE:** Admin only
- **DELETE:** Admin only

#### User Roles Table
- **SELECT:** Admin only (for role checking)
- **INSERT/UPDATE/DELETE:** Restricted

### Edge Function Security
- **Authentication:** Check JWT token
- **Authorization:** Verify admin role
- **Input Validation:** Validate all inputs
- **Rate Limiting:** Planned (not yet implemented)
- **CORS:** Configured for frontend domain

---

## 📊 Analytics Architecture

### Event Tracking Flow
```
1. User action (click, submit, etc.)
2. Event handler calls trackEvent()
3. Data pushed to GTM dataLayer
4. GTM triggers evaluate
5. Tags fire (GA4, etc.)
6. Data sent to Google Analytics
7. Conversions recorded
```

### Tracked Events
- **Page Views:** Automatic on route change
- **Form Submissions:** Contact form, newsletter
- **CTA Clicks:** All call-to-action buttons
- **Phone Clicks:** Click-to-call links
- **Navigation:** Menu and link clicks
- **Search:** Site search queries
- **Downloads:** PDF, resources (future)
- **Errors:** JavaScript errors (future)

### Conversion Goals
- **Primary:** Form submission, phone call
- **Secondary:** Newsletter signup, gallery view
- **Engagement:** Blog read, time on site

---

## 🚀 Deployment & Hosting

### Frontend Deployment
- **Host:** Lovable platform
- **Build:** Vite production build
- **CDN:** Global edge network
- **SSL:** Automatic HTTPS
- **Preview:** Instant preview on code changes

### Backend Deployment
- **Database:** Lovable Cloud (Supabase)
- **Edge Functions:** Auto-deployed on code push
- **Storage:** Lovable Cloud storage buckets
- **Backups:** Automatic database backups

### CI/CD
- **Automatic:** Every git push triggers build
- **Preview:** Each change gets preview URL
- **Production:** Manual promotion or auto-deploy

---

## 📈 Performance Optimizations

### Frontend Optimizations
- **Code Splitting:** Route-based lazy loading
- **Image Lazy Loading:** IntersectionObserver
- **Bundle Size:** Tree shaking, minification
- **Caching:** TanStack Query cache
- **Service Worker:** Offline-first caching
- **CSS:** Tailwind JIT compilation

### Backend Optimizations
- **Database Indexes:** On frequently queried fields
- **RLS:** Efficient policy evaluation
- **Edge Functions:** Global distribution, low latency
- **Storage CDN:** Fast image delivery

### Future Optimizations
- **Responsive Images:** srcset implementation
- **WebP Images:** Modern format support
- **HTTP/2:** Server push (if available)
- **Brotli Compression:** Better than gzip
- **Database Connection Pooling:** Reduce overhead

---

## 🔮 Future Architecture Considerations

### Scalability
- **Database:** Supabase scales automatically
- **Edge Functions:** Serverless scales on demand
- **Frontend:** Static build, CDN-served
- **Storage:** S3-compatible, infinitely scalable

### Multi-Region (If Needed)
- **Database:** Read replicas
- **CDN:** Already global
- **Edge Functions:** Already global

### Monitoring
- **Error Tracking:** Sentry or similar (planned)
- **Performance Monitoring:** Web Vitals tracking
- **Uptime Monitoring:** External service (planned)
- **Log Aggregation:** Centralized logging (planned)

### Backup & Disaster Recovery
- **Database:** Automatic backups by Supabase
- **Code:** Git repository
- **Storage:** Replication (Supabase handles)
- **Recovery Time Objective (RTO):** <1 hour
- **Recovery Point Objective (RPO):** <15 minutes

---

## 🔗 Integration Points

### External APIs
| Service | Purpose | Auth Method | Rate Limits |
|---------|---------|-------------|-------------|
| Lovable AI | Blog generation | API Key (pre-configured) | Based on plan |
| Imagen API | Image generation | API Key | Based on plan |
| Resend | Email delivery | API Key | Based on plan |
| Google Analytics | Analytics | Measurement ID | None |
| Google Tag Manager | Tag management | Container ID | None |
| Formspree | Form backup | API Key | Based on plan |

### Internal Services
| Service | Purpose | Communication |
|---------|---------|---------------|
| Supabase DB | Data storage | PostgreSQL client |
| Supabase Auth | Authentication | JWT tokens |
| Supabase Storage | File storage | S3-compatible API |
| Edge Functions | Backend logic | HTTPS/REST |

---

## 📝 Configuration Management

### Environment Variables
```
# Frontend (.env - auto-managed)
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[key]
VITE_SUPABASE_PROJECT_ID=[id]

# Backend (Supabase secrets)
GEMINI_API_KEY=[key]
RESEND_API_KEY=[key]
LOVABLE_API_KEY=[key]
SUPABASE_URL=[url]
SUPABASE_ANON_KEY=[key]
SUPABASE_SERVICE_ROLE_KEY=[key]
SUPABASE_DB_URL=[url]
```

### Configuration Files
- **tailwind.config.ts:** Tailwind customization
- **vite.config.ts:** Build configuration
- **tsconfig.json:** TypeScript configuration
- **supabase/config.toml:** Backend config (auto-managed)

---

**Last Updated:** January 2025  
**Review Schedule:** Quarterly or on major changes
