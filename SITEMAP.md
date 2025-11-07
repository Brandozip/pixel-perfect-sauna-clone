# Saunas Plus - Site Structure & Page Hierarchy

**Last Updated:** 2024-01-07

## Overview
This document maps the complete page hierarchy and navigation structure of the Saunas Plus website. Use this as a reference for content updates, link audits, and understanding the site's information architecture.

---

## 🏠 Main Navigation Structure

### Home (/)
- **File:** `src/pages/Index.tsx`
- **Components:**
  - Hero section with primary CTAs
  - Services preview (4 featured services)
  - Health Benefits overview
  - Why Choose Us
  - Testimonials
  - Newsletter signup
  - CTA Section
- **Links to:**
  - `/contact` (Free Consultation CTA)
  - `/gallery` (Explore Our Work)
  - `/services` (View All Services)

---

### Services (/services)
- **File:** `src/pages/Services.tsx`
- **Purpose:** Main services overview page
- **Links to all service detail pages:**
  1. `/services/custom-sauna-design`
  2. `/services/custom-sauna-installation`
  3. `/services/steam-shower-installation`
  4. `/services/residential-sauna-builds`
  5. `/services/outdoor-sauna-kits`
  6. `/services/indoor-infrared-sauna`
- **CTAs to:**
  - `/contact` (Get Free Consultation)

#### Service Detail Pages
All service pages follow similar structure with hero, features, and contact CTAs:

1. **Custom Sauna Design** (`/services/custom-sauna-design`)
   - File: `src/pages/services/CustomSaunaDesign.tsx`
   - Focus: Personalized design consultation and planning

2. **Custom Sauna Installation** (`/services/custom-sauna-installation`)
   - File: `src/pages/services/CustomSaunaInstallation.tsx`
   - Focus: Professional installation services

3. **Steam Shower Installation** (`/services/steam-shower-installation`)
   - File: `src/pages/services/SteamShowerInstallation.tsx`
   - Focus: Bathroom spa transformations

4. **Residential Sauna Builds** (`/services/residential-sauna-builds`)
   - File: `src/pages/services/ResidentialSaunaBuilds.tsx`
   - Focus: Complete home sauna projects

5. **Outdoor Sauna Kits** (`/services/outdoor-sauna-kits`)
   - File: `src/pages/services/OutdoorSaunaKits.tsx`
   - Focus: Pre-built outdoor sauna solutions

6. **Indoor Infrared Sauna** (`/services/indoor-infrared-sauna`)
   - File: `src/pages/services/IndoorInfraredSauna.tsx`
   - Focus: Modern infrared technology

---

### Health Benefits (/health-benefits)
- **File:** `src/pages/HealthBenefits.tsx`
- **Purpose:** Main health benefits overview page
- **Links to detailed benefit pages:**
  1. `/health-benefits/detoxification`
  2. `/health-benefits/mental-health`
  3. `/health-benefits/cardiovascular`
  4. `/health-benefits/muscle-recovery`
  5. `/health-benefits/immune-system`
  6. `/health-benefits/anti-aging`
  7. `/health-benefits/chronic-pain-relief`
- **CTAs to:**
  - `/contact` (Get Free Consultation)
  - `/services` (View Our Services)

#### Health Benefit Detail Pages
All benefit pages provide in-depth information about specific health advantages:

1. **Detoxification** (`/health-benefits/detoxification`)
   - File: `src/pages/health-benefits/Detoxification.tsx`

2. **Mental Health** (`/health-benefits/mental-health`)
   - File: `src/pages/health-benefits/MentalHealth.tsx`

3. **Cardiovascular Health** (`/health-benefits/cardiovascular`)
   - File: `src/pages/health-benefits/Cardiovascular.tsx`

4. **Muscle Recovery** (`/health-benefits/muscle-recovery`)
   - File: `src/pages/health-benefits/MuscleRecovery.tsx`

5. **Immune System** (`/health-benefits/immune-system`)
   - File: `src/pages/health-benefits/ImmuneSystem.tsx`

6. **Anti-Aging** (`/health-benefits/anti-aging`)
   - File: `src/pages/health-benefits/AntiAging.tsx`

7. **Chronic Pain Relief** (`/health-benefits/chronic-pain-relief`)
   - File: `src/pages/health-benefits/ChronicPainRelief.tsx`

---

### Gallery (/gallery)
- **File:** `src/pages/Gallery.tsx`
- **Purpose:** Showcase completed projects
- **Features:**
  - Image grid with category filters
  - Lightbox view
  - Project descriptions
- **Database:** `gallery_images` table
- **Admin:** `/admin/gallery` for image management

---

### About (/about)
- **File:** `src/pages/About.tsx`
- **Purpose:** Company story, values, and team
- **Links to:**
  - `/contact` (Get in Touch CTA)
  - `/services` (What We Do)

---

### FAQ (/faq)
- **File:** `src/pages/FAQ.tsx`
- **Purpose:** Frequently asked questions
- **Categories:**
  - General questions
  - Services & pricing
  - Installation process
  - Maintenance & care
- **Links to:**
  - `/contact` (Still have questions?)

---

### Contact (/contact)
- **File:** `src/pages/Contact.tsx`
- **Purpose:** Contact form and business info
- **Features:**
  - Contact form (dual submission: DB + Formspree)
  - Phone: 678-245-9966
  - Email: contact@saunasplus.com
  - Location: Atlanta, GA
- **Database:** `contacts` table
- **Admin:** `/admin/submissions` for form management

---

## 🛠️ Utility Pages

### Cost Calculator (/cost-calculator)
- **File:** `src/pages/CostCalculator.tsx`
- **Purpose:** Interactive pricing estimator
- **Features:**
  - Real-time cost calculations
  - Service selection
  - Size and feature options

### Commercial Projects (/commercial-projects)
- **File:** `src/pages/CommercialProjects.tsx`
- **Purpose:** Business & commercial installations
- **Target:** Gyms, spas, hotels, wellness centers

---

## 🎯 Landing Pages (Special)

### Outdoor Sauna Landing (/outdoor-sauna-landing)
- **File:** `src/pages/OutdoorSaunaLanding.tsx`
- **Purpose:** Targeted landing page for outdoor sauna campaigns
- **Features:** Lead capture, testimonials, quick quotes

### Fast Track Landing (/fast-track)
- **File:** `src/pages/FastTrackLanding.tsx`
- **Purpose:** Express service landing page
- **Features:** Expedited project scheduling

---

## 📋 Legal Pages

### Privacy Policy (/privacy-policy)
- **File:** `src/pages/PrivacyPolicy.tsx`
- **Purpose:** Data protection and privacy information

### Terms of Service (/terms-of-service)
- **File:** `src/pages/TermsOfService.tsx`
- **Purpose:** Legal terms and conditions

---

## 🔐 Admin Dashboard

**Base URL:** `/admin/*`
**Authentication Required:** Yes (admin role)

### Admin Login (/admin/login)
- **File:** `src/pages/admin/Login.tsx`
- **Purpose:** Admin authentication portal

### Admin Dashboard (/admin/dashboard)
- **File:** `src/pages/admin/Dashboard.tsx`
- **Purpose:** Overview of key metrics
- **Metrics:**
  - Newsletter subscribers
  - Form submissions
  - Gallery images
  - Recent activity

### Newsletter Management (/admin/newsletters)
- **File:** `src/pages/admin/Newsletters.tsx`
- **Purpose:** Manage newsletter subscribers
- **Features:**
  - View all subscribers
  - Search & filter
  - Export to CSV
  - Subscription metrics

### Form Submissions (/admin/submissions)
- **File:** `src/pages/admin/Submissions.tsx`
- **Purpose:** Manage contact form submissions
- **Features:**
  - View all submissions
  - Status tracking (new, contacted, qualified, closed)
  - Priority management
  - Admin notes
  - Export to CSV

### Gallery Management (/admin/gallery)
- **File:** `src/pages/admin/Gallery.tsx`
- **Purpose:** Manage gallery images
- **Features:**
  - Image upload (single & bulk)
  - AI-powered metadata generation
  - SEO optimization
  - Category management
  - Publish/unpublish control

---

## 🗺️ Site Map Visualization

```
Home (/)
├── Services (/services)
│   ├── Custom Sauna Design (/services/custom-sauna-design)
│   ├── Custom Sauna Installation (/services/custom-sauna-installation)
│   ├── Steam Shower Installation (/services/steam-shower-installation)
│   ├── Residential Sauna Builds (/services/residential-sauna-builds)
│   ├── Outdoor Sauna Kits (/services/outdoor-sauna-kits)
│   └── Indoor Infrared Sauna (/services/indoor-infrared-sauna)
│
├── Health Benefits (/health-benefits)
│   ├── Detoxification (/health-benefits/detoxification)
│   ├── Mental Health (/health-benefits/mental-health)
│   ├── Cardiovascular (/health-benefits/cardiovascular)
│   ├── Muscle Recovery (/health-benefits/muscle-recovery)
│   ├── Immune System (/health-benefits/immune-system)
│   ├── Anti-Aging (/health-benefits/anti-aging)
│   └── Chronic Pain Relief (/health-benefits/chronic-pain-relief)
│
├── Gallery (/gallery)
├── About (/about)
├── FAQ (/faq)
├── Contact (/contact)
│
├── Utility Pages
│   ├── Cost Calculator (/cost-calculator)
│   └── Commercial Projects (/commercial-projects)
│
├── Landing Pages
│   ├── Outdoor Sauna Landing (/outdoor-sauna-landing)
│   └── Fast Track (/fast-track)
│
├── Legal
│   ├── Privacy Policy (/privacy-policy)
│   └── Terms of Service (/terms-of-service)
│
└── Admin Dashboard (/admin/*)
    ├── Login (/admin/login)
    ├── Dashboard (/admin/dashboard)
    ├── Newsletters (/admin/newsletters)
    ├── Submissions (/admin/submissions)
    └── Gallery (/admin/gallery)
```

---

## 📊 Navigation Links by Location

### Main Navigation (Header)
- Home → `/`
- Services → `/services` (dropdown with 6 service pages)
- Health Benefits → `/health-benefits` (dropdown with 7 benefit pages)
- Gallery → `/gallery`
- About → `/about`
- FAQ → `/faq`
- Contact → `/contact`
- Phone CTA: `678-245-9966`
- Free Consultation Button → `/contact`

### Footer Navigation
- **Quick Links:**
  - Home → `/`
  - About Us → `/about`
  - Services → `/services`
  - Gallery → `/gallery`
  - Health Benefits → `/health-benefits`
  - FAQ → `/faq`
  - Contact → `/contact`

- **Legal:**
  - Privacy Policy → `/privacy-policy`
  - Terms of Service → `/terms-of-service`

- **Contact Info:**
  - Phone: `678-245-9966`
  - Email: `contact@saunasplus.com`
  - Location: Atlanta, GA

- **Newsletter Signup:** Form component

### Admin Sidebar Navigation
- Dashboard → `/admin/dashboard`
- Newsletter Subscribers → `/admin/newsletters`
- Form Submissions → `/admin/submissions`
- Gallery Management → `/admin/gallery`

---

## 🔗 Cross-Page Link Patterns

### Primary Call-to-Actions (appear on multiple pages)
- "Free Consultation" / "Get Free Consultation" → `/contact`
- "View Our Services" / "View All Services" → `/services`
- "Explore Our Work" / "View Our Projects" → `/gallery`
- "Learn More" (on service cards) → Individual service pages

### Secondary Links
- Service pages → Health benefits pages (related content)
- Health benefits pages → Service pages (related solutions)
- All content pages → Contact page (conversion funnel)

---

## ✅ Link Audit Status

**Verified Routes (All Working):**
- ✅ All main navigation links
- ✅ All service detail pages
- ✅ All health benefit pages
- ✅ Gallery, About, FAQ, Contact
- ✅ Utility pages (Calculator, Commercial)
- ✅ Landing pages (Outdoor, Fast Track)
- ✅ Legal pages (Privacy, Terms)
- ✅ All admin routes

**Fixed Issues:**
- ✅ Home page service cards now properly link to detail pages
- ✅ Services page CTAs now properly link to contact
- ✅ Health Benefits CTAs now properly link to contact and services
- ✅ Applied brand styling (primary colors, typography) throughout

---

## 📝 Notes for Future Updates

1. **Blog System (Planned - Phase 2E):**
   - Main blog page: `/blog`
   - Individual posts: `/blog/[slug]`
   - Category pages: `/blog/category/[category]`
   - Tag pages: `/blog/tag/[tag]`

2. **Customer Portal (Planned - Phase 3):**
   - Login: `/portal/login`
   - Dashboard: `/portal/dashboard`
   - Projects: `/portal/projects`
   - Documents: `/portal/documents`

3. **Additional Landing Pages:**
   - Consider season-specific landing pages
   - Regional landing pages for different markets
   - Service-specific PPC landing pages

---

## 🎨 Design System Reference

All pages use the SaunasPlus brand guidelines:
- **Primary Color:** HSL(28, 65%, 53%) - #D2691E
- **Typography:** Playfair Display (headings), Inter (body)
- **Buttons:** `.bg-primary .hover:bg-primary-emphasis`
- **Cards:** `.card-elevated`
- **Forms:** `.form-input`

See `GAME_PLAN.md` Phase 2H for complete design system details.
