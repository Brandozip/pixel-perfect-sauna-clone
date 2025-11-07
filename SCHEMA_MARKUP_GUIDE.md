# Schema Markup Implementation Guide

## Overview
This guide documents the structured data (Schema.org JSON-LD) implementation for Saunas Plus website. Structured data helps search engines understand our content better, leading to rich search results and improved SEO.

---

## Implemented Schemas

### 1. LocalBusiness Schema ✅
**Location:** Homepage (`src/pages/Index.tsx`)  
**Component:** `<LocalBusinessSchema />`

**What it includes:**
- Business name: Saunas Plus
- Contact information (phone, email)
- Address: Atlanta, GA
- Operating hours: Mon-Fri 8am-6pm, Sat 9am-3pm
- Service area: 100-mile radius from Atlanta
- Services offered (all 6 service types)
- Rating: 5.0 stars from 47 reviews
- Price range: $$$
- Geographic coordinates for local SEO

**Purpose:**
- Improves local search rankings
- Enables Google Business Profile integration
- Shows business details in search results
- Powers Google Maps integration

---

### 2. Organization Schema ✅
**Location:** Homepage (`src/pages/Index.tsx`)  
**Component:** `<OrganizationSchema />`

**What it includes:**
- Organization name and URL
- Logo reference
- Contact points (customer service, sales)
- Business address
- Social media profiles (placeholder for future)

**Purpose:**
- Establishes brand identity
- Powers knowledge graph panels
- Connects all brand mentions across the web

---

### 3. WebSite Schema ✅
**Location:** Homepage (`src/pages/Index.tsx`)  
**Component:** `<WebsiteSchema />`

**What it includes:**
- Website name and description
- Site search action (for Google search box)
- Publisher reference

**Purpose:**
- Enables sitelinks search box in Google
- Improves site navigation in search results
- Connects website to organization

---

### 4. Service Schema ✅
**Location:** Individual service pages (e.g., `CustomSaunaDesign.tsx`)  
**Component:** `<ServiceSchema />`

**What it includes:**
- Service name and description
- Provider details (links to LocalBusiness)
- Service area
- Features and benefits
- Pricing information
- Availability status

**Purpose:**
- Rich snippets in search results
- Service-specific search rankings
- Detailed service information display

**Example Implementation:**
```tsx
<ServiceSchema
  name="Custom Sauna Design"
  description="Personalized sauna designs that blend seamlessly with your space"
  url="https://www.saunasplus.com/services/custom-sauna-design"
  serviceType="Home Improvement Service"
  areaServed={["Atlanta, GA", "Georgia", "Southeastern United States"]}
  additionalInfo={{
    features: [
      "3D design visualization",
      "Material selection consultation"
    ],
    priceRange: "Contact for quote"
  }}
/>
```

---

### 5. Breadcrumb Schema ✅
**Location:** Service and detail pages  
**Component:** `<BreadcrumbSchema />`

**What it includes:**
- Page hierarchy path
- Each breadcrumb item with name and URL
- Sequential positioning

**Purpose:**
- Breadcrumb display in search results
- Improved site navigation understanding
- Better crawlability

**Example Implementation:**
```tsx
<BreadcrumbSchema
  items={[
    { name: "Home", url: "https://www.saunasplus.com/" },
    { name: "Services", url: "https://www.saunasplus.com/services" },
    { name: "Custom Sauna Design", url: "https://www.saunasplus.com/services/custom-sauna-design" }
  ]}
/>
```

---

## Future Schema Types (Planned)

### 6. FAQPage Schema (Phase 4B)
**Location:** FAQ page  
**Purpose:** FAQ rich results in Google

**What to include:**
- Each question and answer pair
- Categories of questions
- Related services

### 7. Product Schema (Phase 2E - when products added)
**Location:** Product pages  
**Purpose:** Product rich results, shopping integration

**What to include:**
- Product name, description, image
- Price and availability
- Reviews and ratings
- SKU and brand

### 8. Article/BlogPosting Schema (Phase 2E - Blog)
**Location:** Blog posts  
**Purpose:** Article rich results, AMP stories

**What to include:**
- Article title, author, date
- Featured image
- Article body (truncated)
- Publisher information
- Reading time

### 9. Review Schema (when reviews implemented)
**Location:** Testimonials section, review pages  
**Purpose:** Star ratings in search results

**What to include:**
- Reviewer name
- Rating value (1-5)
- Review text
- Review date

### 10. VideoObject Schema (when videos added)
**Location:** Gallery, service pages  
**Purpose:** Video rich results, video carousel

**What to include:**
- Video title and description
- Thumbnail image
- Upload date and duration
- Embed URL

---

## How to Add Schema to New Pages

### For Service Pages:
1. Import the schema components:
```tsx
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
```

2. Add inside ThemeProvider (before main content):
```tsx
<ThemeProvider attribute="class" defaultTheme="light">
  <ServiceSchema
    name="Your Service Name"
    description="Service description"
    url="https://www.saunasplus.com/services/your-service"
    serviceType="Home Improvement Service"
    areaServed={["Atlanta, GA", "Georgia"]}
    additionalInfo={{
      features: ["Feature 1", "Feature 2"],
      priceRange: "Contact for quote"
    }}
  />
  <BreadcrumbSchema
    items={[
      { name: "Home", url: "https://www.saunasplus.com/" },
      { name: "Services", url: "https://www.saunasplus.com/services" },
      { name: "Your Service", url: "https://www.saunasplus.com/services/your-service" }
    ]}
  />
  {/* Rest of page content */}
</ThemeProvider>
```

### For Health Benefit Pages:
Similar to service pages, but use appropriate schema type (likely Article or WebPage).

### For New Landing Pages:
Use LocalBusiness schema if it's location-specific, or WebPage schema for general pages.

---

## Testing Structured Data

### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check for errors and warnings
4. Fix any issues found

### Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Paste your page URL or HTML
3. Review validation results
4. Ensure no critical errors

### Google Search Console
1. Go to Enhancement reports
2. Check structured data coverage
3. Monitor for errors over time
4. Resubmit URLs after fixes

---

## Best Practices

### 1. Use Specific Schema Types
- Don't use generic "Thing" type
- Use the most specific applicable type
- Combine multiple schemas when appropriate

### 2. Include Required Properties
- Each schema type has required fields
- Missing required fields = invalid markup
- Check documentation: https://schema.org/

### 3. Use Consistent Identifiers
- Use @id to link related entities
- Organization @id should be same across site
- Link services back to organization

### 4. Keep Data Accurate
- Schema data must match visible page content
- Don't add information not on the page
- Update schema when content changes

### 5. Don't Overdo It
- Only add relevant schema types
- Avoid schema spam
- Focus on user value

---

## Common Issues & Solutions

### Issue: Schema Not Showing in Search
**Solutions:**
- Wait 1-2 weeks for Google to recrawl
- Submit URL in Search Console
- Check for validation errors
- Ensure content matches schema

### Issue: Validation Warnings
**Solutions:**
- Warnings are OK (not errors)
- Add recommended fields when possible
- Prioritize user experience over perfect scores

### Issue: Duplicate Schemas
**Solutions:**
- Use unique @id for each entity
- Remove duplicate script tags
- Check that components clean up on unmount

### Issue: Schema Not Rendering
**Solutions:**
- Verify JSON is valid (use JSON validator)
- Check browser console for errors
- Ensure script tags are in <head>
- Verify useEffect dependencies

---

## Schema Component Architecture

### File Structure:
```
src/components/seo/
├── StructuredData.tsx     # Business, Organization, Website schemas
└── ServiceSchema.tsx      # Service and Breadcrumb schemas
```

### How It Works:
1. Schema components use React hooks (useEffect)
2. On mount, they create <script> tags with JSON-LD
3. Script tags are injected into document <head>
4. On unmount, script tags are removed (cleanup)
5. Each schema has unique ID to prevent duplicates

### Adding New Schema Types:
1. Create new component in appropriate file
2. Follow existing pattern (useEffect + script injection)
3. Use Schema.org documentation for structure
4. Include proper @context and @type
5. Add cleanup in useEffect return function
6. Export and use in relevant pages

---

## Monitoring & Maintenance

### Weekly:
- [ ] Check Google Search Console for schema errors
- [ ] Review rich results performance

### Monthly:
- [ ] Test random pages with Rich Results Test
- [ ] Update schema if business info changes
- [ ] Add schema to newly created pages

### Quarterly:
- [ ] Comprehensive site-wide schema audit
- [ ] Update ratings/reviews if applicable
- [ ] Check for new schema opportunities
- [ ] Review Schema.org for new types

---

## Business Information Update Checklist

When business details change, update in these locations:

**Phone Number Changes:**
- [ ] LocalBusinessSchema (StructuredData.tsx)
- [ ] OrganizationSchema (StructuredData.tsx)
- [ ] ServiceSchema provider section (ServiceSchema.tsx)
- [ ] Footer component
- [ ] NavActions component
- [ ] Contact page

**Address Changes:**
- [ ] LocalBusinessSchema
- [ ] OrganizationSchema
- [ ] Footer
- [ ] Contact page
- [ ] Google Business Profile (external)

**Hours Changes:**
- [ ] LocalBusinessSchema (openingHoursSpecification)
- [ ] Update website content where displayed

**Services Changes:**
- [ ] LocalBusinessSchema (hasOfferCatalog)
- [ ] Add new ServiceSchema to new pages
- [ ] Update navigation
- [ ] Update sitemap

---

## Resources

### Official Documentation:
- Schema.org: https://schema.org/
- Google Search Central: https://developers.google.com/search/docs/appearance/structured-data
- JSON-LD: https://json-ld.org/

### Tools:
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

### Learning:
- Google Schema Markup course: https://developers.google.com/search/docs/appearance/structured-data
- Schema.org getting started: https://schema.org/docs/gs.html

---

**Last Updated:** 2024-01-07  
**Next Review:** When Phase 2E (Blog) is implemented
