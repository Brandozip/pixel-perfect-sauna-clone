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

### 6. FAQPage Schema ✅
**Location:** FAQ page (`src/pages/FAQ.tsx`)  
**Component:** `<FAQSchema />`

**What it includes:**
- All question-answer pairs (12 FAQs)
- Structured as Schema.org Question/Answer format
- Link to service provider (LocalBusiness)
- Page context and website reference

**Purpose:**
- Rich FAQ results in Google search
- FAQ accordion display in search listings
- Direct answers in Google's "People Also Ask"
- Voice search optimization

**Example Implementation:**
```tsx
const faqs = [
  {
    question: "How long does a sauna installation take?",
    answer: "Most residential sauna installations take 3-7 days..."
  },
  // ... more FAQs
];

<FAQSchema faqs={faqs} />
```

**SEO Benefits:**
- Featured FAQ snippets in search results
- Increased visibility for question-based queries
- Higher click-through rates
- Voice assistant compatibility

---

### 7. Review/AggregateRating Schema ✅
**Location:** Homepage (`src/pages/Index.tsx`)  
**Component:** `<ReviewSchema />`

**What it includes:**
- AggregateRating with overall business rating (5.0 stars)
- Review count (47 reviews)
- Individual Review items for displayed testimonials
- Reviewer names and locations
- Review text and ratings
- Publication dates
- Link to LocalBusiness entity

**Purpose:**
- Display star ratings in Google search results
- Show review count in search listings
- Rich review snippets in search
- Build trust and credibility
- Improve click-through rates

**Example Implementation:**
```tsx
<ReviewSchema />
```

**SEO Benefits:**
- Star ratings appear next to business name in search
- Review counts increase trust and visibility
- Enhanced local SEO signals
- Better conversion rates from search results

---

### 8. ImageObject Schema ✅
**Location:** Gallery page (`src/pages/Gallery.tsx`)  
**Component:** `<ImageObjectSchema />`

**What it includes:**
- Individual ImageObject for each gallery image
- ImageGallery wrapper for collections
- Content URL, name, description, caption
- Creator/photographer attribution
- Copyright and license information
- Upload date and keywords
- Link to license acquisition page
- Publisher information (Saunas Plus)

**Purpose:**
- Image search visibility in Google Images
- Proper attribution and copyright display
- License information for potential users
- Enhanced image SEO with rich metadata

**Example Implementation:**
```tsx
<ImageObjectSchema 
  images={filteredImages.map(img => ({
    url: img.image_url,
    title: img.title,
    description: img.description,
    alt_text: img.alt_text,
    photographer_credit: img.photographer_credit,
    license_info: img.license_info,
    category: img.category,
    uploadDate: img.created_at
  }))}
/>
```

**SEO Benefits:**
- Images appear in Google Images with proper attribution
- License information helps with content discovery
- Photographer credits improve professional credibility
- Better image ranking in search results

---

### 9. Article/BlogPosting Schema ✅ (Prepared)
**Location:** Blog pages (when Phase 2E implemented)  
**Component:** `<ArticleSchema />`, `<BlogSchema />`, `<AuthorSchema />`

**What it includes:**
- Article title, description, and URL
- Author information (name, URL, bio)
- Publication and modification dates
- Featured image with proper dimensions
- Article category and tags
- Word count and reading time
- Publisher organization details
- Link to blog collection

**Purpose:**
- Rich article snippets in Google search
- Enhanced blog post visibility
- Author attribution and credibility
- Better content discovery
- Voice search optimization

**Example Implementation:**
```tsx
<ArticleSchema
  title="The Ultimate Guide to Home Sauna Installation"
  description="Learn everything about installing a custom sauna in your home"
  url="https://www.saunasplus.com/blog/home-sauna-installation-guide"
  datePublished="2024-01-15"
  dateModified="2024-01-20"
  authorName="Grayson Smith"
  authorUrl="https://www.saunasplus.com/about"
  featuredImage="https://www.saunasplus.com/images/blog/home-sauna-guide.jpg"
  category="Installation Guides"
  tags={["sauna", "installation", "home improvement", "wellness"]}
  wordCount={2500}
  readingTime={10}
/>
```

**SEO Benefits:**
- Article rich snippets with publish date and author
- Better ranking for informational queries
- Enhanced content visibility in search results
- Author credibility signals to search engines

---

## Future Schema Types (Planned)

### 10. Product Schema (Phase 2E - when products added)
**Location:** Product pages  
**Purpose:** Product rich results, shopping integration

**What to include:**
- Product name, description, image
- Price and availability
- Reviews and ratings
- SKU and brand

### 11. VideoObject Schema (when videos added)
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
├── ServiceSchema.tsx      # Service and Breadcrumb schemas
├── FAQSchema.tsx          # FAQPage schema
├── ReviewSchema.tsx       # Review and AggregateRating schemas
├── ImageObjectSchema.tsx  # ImageObject and ImageGallery schemas
└── ArticleSchema.tsx      # Article/BlogPosting, Blog, and Author schemas
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
