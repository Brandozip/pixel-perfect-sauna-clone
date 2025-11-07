# Saunas Plus - Development Game Plan

## Project Overview
This document outlines the development roadmap and strategic plan for the Saunas Plus website rebuild and expansion.

## Phase 1: Foundation ✅ COMPLETE
✅ **Completed:**
- Modern React/TypeScript codebase with Vite
- Responsive design system with Tailwind CSS
- All core pages migrated (28 pages total)
- **Modular navigation system with dropdown menus**
- **Fuzzy search functionality across all pages**
- **Theme toggle (light/dark mode)**
- SEO optimization
- Mobile-responsive design with hamburger menu

✅ **Form & Data Collection:**
- Cost Calculator with real-time estimates
- Database integration for contact submissions (Formspree)
- Enhanced contact form with service selection
- **Newsletter subscription system with database storage**
- **Newsletter subscribers table with RLS policies**

✅ **Design System:**
- Custom color tokens (sauna colors, wood tones)
- Utility classes (container-fluid, shadow-custom, link-muted)
- Consistent typography system

## Phase 2: Admin Dashboard & Content Management (Current Focus)

### Phase 2A: Admin Authentication & Foundation ✅ COMPLETE
**Priority: HIGH - Required for all admin features**

✅ **Database Schema - IMPLEMENTED:**
- `user_roles` table: Admin role management
  - Columns: id, user_id (FK to auth.users), role (enum: admin/moderator/user), created_at
  - Security definer function `has_role()` for role checking
  - RLS policies to prevent privilege escalation
- `app_role` enum type: Define user role levels (admin/moderator/user)

✅ **Authentication - IMPLEMENTED:**
- Admin login page (/admin/login) with secure form
- Secure authentication flow with Supabase Auth
- Protected admin routes with role verification (ProtectedRoute component)
- Session management with auto-refresh
- AdminAuthProvider context for global auth state
- useAdminAuth hook for accessing auth state
- Admin dashboard at /admin/dashboard
- **SECURITY:** Server-side role validation via security definer function

### Phase 2B: Newsletter Management 📧 (NEXT)
**Estimated: 1-2 days | Status: Ready to start**

✅ **Database Already Ready:**
- `newsletter_subscribers` table exists with RLS

🎯 **Admin Features:**
- View all newsletter subscribers (paginated table)
- Search and filter subscribers by email, date
- Export subscribers to CSV
- View subscription metrics (total, new this week/month)
- Manual subscriber removal (with confirmation)
- Subscriber status management (active/inactive)

📊 **UI Components:**
- Data table with sorting and pagination
- Search bar with real-time filtering
- Export button (CSV download)
- Metrics cards showing key stats

### Phase 2C: Form Submissions Management 📝
**Estimated: 1-2 days**

📋 **Database Schema:**
- `contacts` table already exists (needs review)
- Consider adding: status field (new/contacted/closed), priority, notes

🎯 **Admin Features:**
- View all contact submissions (paginated)
- Filter by service type, date range, status
- Mark submissions as read/contacted/closed
- Add internal notes to submissions
- Quick actions: email, call, archive
- Export submissions to CSV
- Submission metrics and trends

📊 **UI Components:**
- Advanced data table with status badges
- Filter dropdowns and search
- Modal for viewing full submission details
- Note-taking interface
- Status update workflow

### Phase 2D: Gallery Image Management 🖼️
**Estimated: 2-3 days**

📋 **Database Schema:**
- `gallery_images` table:
  - id, created_at, updated_at
  - image_url (Supabase Storage reference)
  - title, alt_text, description
  - category (residential/commercial/outdoor/etc)
  - featured (boolean), order_index
  - seo_keywords, seo_title, seo_description
  - project_details (JSON: client, location, year, etc)
  - is_published (boolean)

💾 **Storage Setup:**
- Supabase Storage bucket: `gallery-images`
- Public bucket with CDN
- Image optimization (resize, compress on upload)
- Supported formats: JPG, PNG, WEBP

🎯 **Admin Features:**
- Drag-and-drop image upload (multiple files)
- Image preview before upload
- Bulk upload capability
- SEO metadata form for each image:
  - Title, alt text, description
  - Keywords, category
  - Project details
- Image editing: crop, resize, optimize
- Reorder images (drag-and-drop)
- Delete images (with confirmation)
- Publish/unpublish toggle
- Featured image selection

📊 **UI Components:**
- Upload dropzone with progress bars
- Grid view of uploaded images
- Image detail editor modal
- SEO optimization checklist
- Category management

### Phase 2E: Blog Content Management ✍️
**Estimated: 3-4 days**

📋 **Database Schema:**
- `blog_posts` table:
  - id, created_at, updated_at, published_at
  - author_id (FK to auth.users)
  - title, slug (unique), excerpt
  - content (markdown or rich text)
  - featured_image_url
  - category, tags (array)
  - status (draft/scheduled/published)
  - seo_title, seo_description, seo_keywords
  - view_count, reading_time
  - is_featured
- `blog_categories` table: Predefined categories
- `blog_tags` table: Tag management

🎯 **Admin Features:**
- Rich text editor (TipTap or similar)
- Markdown support
- Image embedding with upload
- Draft/publish/schedule workflow
- SEO optimization panel
- Preview before publish
- Slug auto-generation from title
- Category and tag management
- Featured post selection
- Analytics per post (views, engagement)

📊 **UI Components:**
- Rich text editor with toolbar
- Media library integration
- SEO optimization sidebar
- Publish scheduling calendar
- Post list with filters (status, category, author)
- Post preview modal

### Phase 2F: Analytics Dashboard 📊
**Estimated: 2-3 days**

🎯 **Analytics Features:**

**Internal Database Analytics:**
- Newsletter subscriber growth over time
- Contact form submission trends
- Most requested services
- Response time metrics
- Conversion funnel visualization

**Lovable Analytics Integration (if available):**
- Page views and unique visitors
- Traffic sources
- Popular pages
- Device/browser breakdown
- Geographic data

**Gallery Analytics:**
- Most viewed gallery images
- Popular project categories
- Image engagement metrics

**Blog Analytics:**
- Post views and reading time
- Popular posts and categories
- Reader engagement metrics
- SEO performance

📊 **UI Components:**
- Summary cards (KPIs)
- Line charts (trends over time)
- Bar charts (comparisons)
- Pie charts (distributions)
- Date range selector
- Export reports functionality

### Phase 2G: Admin Dashboard Layout & Navigation
**Estimated: 1 day**

🎨 **Layout Requirements:**
- Sidebar navigation with collapsible menu
- Sections:
  - Dashboard (overview)
  - Newsletter Subscribers
  - Form Submissions
  - Gallery Management
  - Blog Posts
  - Analytics
  - Settings (future)
- Top bar: User profile, notifications, logout
- Responsive design (mobile-friendly)
- Theme toggle (inherit from main site)

## Technical Implementation Plan

### Database Migrations Order:
1. User roles and authentication setup
2. Gallery images table and storage bucket
3. Blog posts, categories, and tags tables
4. Update contacts table with additional fields
5. Create security definer functions for role checks

### Component Architecture:
- `/admin` - Protected layout wrapper
- `/admin/dashboard` - Overview page
- `/admin/newsletters` - Newsletter management
- `/admin/submissions` - Form submissions
- `/admin/gallery` - Image management
- `/admin/blog` - Blog CMS
- `/admin/analytics` - Analytics dashboard

### Security Checklist:
- ✅ Server-side role validation
- ✅ RLS policies on all admin tables
- ✅ Security definer functions for role checks
- ✅ Protected routes with auth guards
- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ Rate limiting on sensitive operations

## Phase 3: Enhanced Features
🎯 **Planned:**
- Customer portal for project tracking
- Photo gallery management system
- Testimonial submission and approval workflow
- Blog/article management system
- **Newsletter email automation (connected to database)**
- Analytics and reporting dashboard
- Admin panel for newsletter management

## Phase 4: Marketing & SEO
📈 **Roadmap:**
- Advanced SEO optimization
- Schema markup implementation
- Social media integration
- Lead magnet creation (ebooks, guides)
- Email drip campaigns
- Conversion rate optimization (CRO)

## Phase 5: Advanced Functionality
🚀 **Future:**
- 3D sauna visualization tool
- Virtual consultations (video calls)
- Online booking system
- Payment processing integration
- Customer reviews and ratings system
- Referral program automation

## Technical Architecture

### Current Stack:
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components, custom design tokens
- **Backend:** Supabase Cloud (PostgreSQL, Edge Functions)
- **Forms:** Formspree (contact form)
- **Email:** Resend API (planned for newsletters and notifications)
- **Theme:** next-themes (dark/light mode)
- **Hosting:** Lovable Cloud
- **Version Control:** Git

### Database Schema:
✅ **Implemented:**
- `contacts` table: Store customer inquiries (with RLS policies)
- `newsletter_subscribers` table: Email list with subscription tracking (with RLS policies)

🔄 **Admin Dashboard (Phase 2):**
- ✅ `user_roles` table: Admin role management with security definer (COMPLETE)
- ✅ `app_role` enum: User role types (admin/moderator/user) (COMPLETE)
- 📋 `gallery_images` table: Gallery management with SEO metadata (planned)
- 📋 `blog_posts` table: Blog content management (planned)
- 📋 `blog_categories` table: Blog categorization (planned)
- 📋 `blog_tags` table: Blog tagging system (planned)
- 📋 Storage bucket: `gallery-images` (public, CDN-enabled) (planned)

📋 **Future tables (Phase 3+):**
- `projects`: Track sauna projects
- `quotes`: Manage price quotes
- `testimonials`: Customer reviews and ratings
- `project_photos`: Link photos to projects

## Key Priorities

### Immediate (Current Sprint - 2-3 weeks):
1. ✅ Complete cost calculator
2. ✅ Database integration for contacts
3. ✅ Newsletter subscription system
4. ✅ Modular navigation with search
5. ✅ **Phase 2A: Admin authentication & role system** (COMPLETE)
6. 🔄 **Phase 2B: Newsletter management interface** (1-2 days) ← CURRENT
7. 🔄 **Phase 2C: Form submissions management** (1-2 days)
8. 🔄 **Phase 2D: Gallery image upload & SEO** (2-3 days)
9. 🔄 **Phase 2E: Blog CMS implementation** (3-4 days)
10. 🔄 **Phase 2F: Analytics dashboard** (2-3 days)
11. 🔄 **Phase 2G: Admin layout & navigation** (1 day)
12. Image optimization and CDN setup

### Short-term (1-3 months):
1. Email automation via Resend for contact form and newsletters
2. Project management system
3. Quote generation and tracking
4. Customer portal
5. Public blog display pages
6. Testimonial submission and approval system

### Long-term (3-6 months):
1. 3D visualization tools
2. Advanced booking system
3. Payment processing
4. Mobile app consideration
5. AI-powered recommendations

## Success Metrics
- Lead conversion rate
- Contact form submission rate
- Cost calculator usage
- Page load times
- SEO rankings
- Customer satisfaction scores

## Notes
- Prioritize mobile experience (60%+ mobile traffic expected)
- Focus on conversion optimization
- Maintain fast page load times (<2s)
- Ensure accessibility compliance (WCAG 2.1 AA)
- Regular security audits
- Continuous SEO monitoring

## Contact Information
**Business:** Saunas Plus  
**Phone:** 678-245-9966  
**Email:** contact@saunasplus.com  
**Service Area:** Metro Atlanta, GA

---

## Recent Updates (Latest First)

### January 2025 - Phase 2A: Admin Authentication Complete ✅
- ✅ Created `user_roles` table with RLS policies
- ✅ Implemented `app_role` enum (admin/moderator/user)
- ✅ Built `has_role()` security definer function for safe role checking
- ✅ Created admin login page with secure authentication
- ✅ Built AdminAuthProvider context and useAdminAuth hook
- ✅ Implemented ProtectedRoute component for route guards
- ✅ Created admin dashboard layout with placeholder cards
- ✅ Configured auth with auto-confirm emails for development
- 🎯 Next: Phase 2B - Newsletter Management Interface

### January 2025 - Admin Dashboard Planning
- 📋 Detailed admin dashboard roadmap created
- 📋 Database schema designed for admin features
- 📋 Security architecture planned (roles, RLS)
- 📋 Feature breakdown: newsletters, forms, gallery, blog, analytics
- 📋 Implementation timeline: 2-3 weeks for full admin system

### January 2025 - Navigation & Newsletter System
- ✅ Rebuilt navigation system with modular components
- ✅ Added fuzzy search functionality across site
- ✅ Implemented newsletter subscription with database integration
- ✅ Updated footer with newsletter signup
- ✅ Enhanced design system with custom color tokens
- ✅ Mobile-responsive navigation with hamburger menu
- ✅ Theme toggle integration (light/dark mode)

### Previous Updates
- ✅ Cost calculator implementation
- ✅ Contact form with Formspree integration
- ✅ Database structure for contacts
- ✅ Initial site migration to React/TypeScript

---

*Last Updated: January 2025*  
*Version: 2.3 - Phase 2A Complete, Ready for Phase 2B*