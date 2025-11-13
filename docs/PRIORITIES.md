# Saunas Plus - Priority Roadmap

**Last Updated:** January 2025

## 🎯 Priority System

### Priority Levels
- **P0 (Critical)** - Blocking issues, revenue impact
- **P1 (High)** - Important features, significant impact
- **P2 (Medium)** - Valuable improvements, moderate impact
- **P3 (Low)** - Nice-to-have, minimal impact

### Impact Assessment
- **Revenue** - Direct conversion/sales impact
- **SEO** - Search visibility and ranking
- **UX** - User experience and engagement
- **Performance** - Speed and optimization
- **Maintenance** - Code quality and sustainability

---

## 🔥 P0 - Critical (Do Now)

### Blog Generation System Fixes
**Status:** 🚧 In Progress  
**Impact:** Revenue, Content, SEO  
**Timeline:** Week 1

#### Issues
1. Manual generation trigger not working
2. Response cleaning needed (AI commentary in output)
3. Intermediate results not persisted
4. Error handling insufficient

#### Action Items
- [x] Add comprehensive logging to BlogPosts.tsx
- [ ] Fix manual generation trigger
- [ ] Implement response cleaning utilities
- [ ] Store intermediate generation results
- [ ] Add better error messages
- [ ] Test end-to-end generation flow

**Related Files:**
- `src/pages/admin/BlogPosts.tsx`
- `supabase/functions/generate-blog/index.ts`
- `src/pages/admin/BlogGeneratorSettings.tsx`

---

### GTM Container Configuration
**Status:** 📋 Planned  
**Impact:** Analytics, Marketing  
**Timeline:** Week 1

#### Missing Configurations
1. Event tracking tags not fully configured
2. Conversion tracking incomplete
3. Variables need definition
4. Triggers need testing

#### Action Items
- [ ] Configure GTM container with documented tags
- [ ] Set up conversion events
- [ ] Test all triggers
- [ ] Verify data flow to GA4

**Related Files:**
- `src/constants/gtmConfig.ts`
- `src/utils/analytics.ts`
- Documentation in GTM_SETUP_GUIDE.md

---

## ⚡ P1 - High Priority (Next Sprint)

### Responsive Image Implementation
**Status:** 📋 Planned  
**Impact:** Performance, SEO, UX  
**Timeline:** Week 2

#### Goals
- Implement srcset/sizes for all images
- Generate multiple image sizes
- Improve Core Web Vitals (LCP)
- Reduce bandwidth usage

#### Action Items
- [ ] Audit all image usages
- [ ] Set up image resizing pipeline
- [ ] Implement responsive image component
- [ ] Update LazyImage component
- [ ] Test on various devices/viewports

**Related Files:**
- `src/components/ui/lazy-image.tsx`
- All image imports across components

---

### Shopify Integration
**Status:** 📋 Planned  
**Impact:** Revenue, Features  
**Timeline:** Week 2-3

#### Features
- Product catalog sync
- Shopping cart integration
- Checkout flow
- Inventory management

#### Action Items
- [ ] Enable Shopify integration tool
- [ ] Design product display pages
- [ ] Implement cart functionality
- [ ] Set up checkout process
- [ ] Test purchase flow

**Dependencies:** Requires Shopify account setup

---

### Push Notifications System
**Status:** 📋 Planned  
**Impact:** Engagement, Retention  
**Timeline:** Week 3

#### Capabilities
- Blog post notifications
- Special offers
- Appointment reminders
- News updates

#### Action Items
- [ ] Implement service worker notifications
- [ ] Create notification preferences UI
- [ ] Build backend notification system
- [ ] Test push delivery
- [ ] Handle permission requests

**Related Files:**
- `src/components/PWAInstallPrompt.tsx`
- Service worker configuration

---

## 📊 P2 - Medium Priority (This Month)

### SEO Enhancement
**Status:** 🚧 In Progress  
**Impact:** SEO, Traffic  
**Timeline:** Month 1

#### Focus Areas
1. Internal linking optimization
2. Content gap analysis
3. Technical SEO audit
4. Schema markup expansion

#### Action Items
- [ ] Implement automated internal linking
- [ ] Create content calendar
- [ ] Audit existing content
- [ ] Expand schema markup
- [ ] Build backlink strategy

**Related Files:**
- `src/components/seo/*`
- Content pages

---

### Form Optimization
**Status:** 📋 Planned  
**Impact:** Conversion, UX  
**Timeline:** Month 1

#### Improvements
- Multi-step forms for complex requests
- Smart field validation
- Auto-save drafts
- Progress indicators

#### Action Items
- [ ] Redesign contact form flow
- [ ] Add validation improvements
- [ ] Implement auto-save
- [ ] A/B test form variations

**Related Files:**
- `src/components/shared/ContactForm.tsx`
- `src/hooks/useContactForm.tsx`

---

### Performance Monitoring
**Status:** 📋 Planned  
**Impact:** Performance, UX  
**Timeline:** Month 1

#### Metrics to Track
- Core Web Vitals
- Bundle size trends
- API response times
- Error rates

#### Action Items
- [ ] Set up performance monitoring
- [ ] Create performance dashboard
- [ ] Set up alerts for regressions
- [ ] Implement automated testing

**Integration:** Google Analytics, custom monitoring

---

## 🎨 P3 - Low Priority (This Quarter)

### Advanced Gallery Features
**Status:** 💡 Proposed  
**Impact:** UX, Engagement  
**Timeline:** Q1

#### Features
- Image filtering by category
- Lightbox gallery view
- Before/after sliders
- 360° project views

#### Action Items
- [ ] Design gallery interface
- [ ] Implement filtering logic
- [ ] Add lightbox component
- [ ] Create before/after slider

**Related Files:**
- `src/pages/Gallery.tsx`
- `src/pages/admin/Gallery.tsx`

---

### Advanced Analytics Dashboard
**Status:** 💡 Proposed  
**Impact:** Business Intelligence  
**Timeline:** Q1

#### Features
- Real-time visitor tracking
- Conversion funnel visualization
- Heat maps
- Custom reports

#### Action Items
- [ ] Design dashboard UI
- [ ] Implement data collection
- [ ] Build visualization components
- [ ] Create export functionality

**Related Files:**
- `src/pages/admin/Analytics.tsx`

---

### Customer Portal
**Status:** 💡 Proposed  
**Impact:** Customer Service, Retention  
**Timeline:** Q2

#### Features
- Project tracking
- Document sharing
- Appointment scheduling
- Payment portal

#### Action Items
- [ ] Design portal architecture
- [ ] Implement authentication
- [ ] Build project tracking UI
- [ ] Create document upload system

**Dependencies:** Requires authentication system

---

## 📅 Timeline Overview

### Week 1 (Current)
- Fix blog generation system
- Configure GTM container
- Begin responsive images audit

### Weeks 2-3
- Implement responsive images
- Shopify integration setup
- Push notifications system

### Month 1
- SEO enhancement initiatives
- Form optimization
- Performance monitoring setup

### Quarter 1
- Advanced gallery features
- Analytics dashboard
- Continued SEO work

### Quarter 2
- Customer portal
- Advanced features
- Integration expansions

---

## 🔄 Review Schedule

### Daily
- Monitor error logs
- Check conversion metrics
- Review user feedback

### Weekly
- Sprint planning and review
- Priority reassessment
- Performance check

### Monthly
- Feature deployment review
- SEO ranking analysis
- Business goal alignment

### Quarterly
- Strategic planning
- Major feature releases
- Technology stack review

---

## 📝 Priority Change Log

### January 2025
- Elevated blog generation fixes to P0
- Added GTM configuration to P0
- Moved Shopify integration to P1
- Added responsive images as P1

---

**Next Review:** End of Week 1  
**Focus:** Complete P0 items, begin P1 planning
