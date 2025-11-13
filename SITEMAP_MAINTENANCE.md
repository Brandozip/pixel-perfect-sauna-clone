# XML Sitemap Maintenance Guide

## Overview
The Saunas Plus website uses a simple static sitemap for optimal SEO and reliability.

---

## Current Implementation: Static Sitemap

### Location
- **File:** `public/sitemap.xml`
- **URL:** `https://www.saunasplus.com/sitemap.xml`
- **Referenced in:** `public/robots.txt`

### Current Pages
✅ Homepage  
✅ Main category pages (Services, Health Benefits, Blog)  
✅ All service detail pages (6 pages)  
✅ All health benefit pages (7 pages)  
✅ Gallery, About, FAQ, Contact  
✅ Utility pages (Cost Calculator, Commercial Projects)  
✅ Legal pages (Privacy Policy, Terms of Service)  

**Total: 27 URLs**

### When to Update Static Sitemap

**Add new URL entries when:**
1. Creating new service pages
2. Adding new health benefit pages
3. Creating new landing pages
4. Adding new utility pages (tools, resources)
5. Creating new top-level pages

**How to Update:**
1. Open `public/sitemap.xml`
2. Add new `<url>` entry following the existing pattern:
```xml
<url>
  <loc>https://www.saunasplus.com/your-new-page</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```
3. Commit and publish the changes

---

## Priority Guidelines

Use these priorities for new pages:

| Priority | Use For | Examples |
|----------|---------|----------|
| 1.0 | Homepage only | `/` |
| 0.9 | Main category pages | `/services`, `/health-benefits`, `/blog` |
| 0.8 | Important pages | `/contact`, `/about`, `/gallery` |
| 0.7 | Service detail pages, FAQ | `/services/custom-sauna-design` |
| 0.6 | Benefit pages, blog posts | `/health-benefits/detoxification` |
| 0.5 | Utility & landing pages | `/cost-calculator`, `/outdoor-sauna-landing` |
| 0.4 | Legal pages | `/privacy-policy`, `/terms-of-service` |

---

## Change Frequency Guidelines

Use these frequencies for new pages:

| Frequency | Use For | Examples |
|-----------|---------|----------|
| `daily` | Frequently updated | Homepage, Gallery, Blog index |
| `weekly` | Regularly updated | Main sections, About, Contact |
| `monthly` | Occasionally updated | Service pages, Benefit pages, Blog posts |
| `yearly` | Rarely updated | Legal pages, Terms |

---

## SEO Best Practices

### 1. Keep Sitemap Under 50,000 URLs
- Current: 30 URLs ✅
- If exceeding 50,000, create multiple sitemaps with a sitemap index

### 2. Use Accurate Last Modified Dates
- Only update `<lastmod>` when content actually changes
- Don't use current date for all pages

### 3. Compress for Large Sitemaps
- Sitemaps can be gzipped (sitemap.xml.gz)
- Not needed until 10,000+ URLs

### 4. Submit to Search Engines
After updating sitemap:
- **Google Search Console:** https://search.google.com/search-console
  - Go to Sitemaps section
  - Submit: `https://www.saunasplus.com/sitemap.xml`
- **Bing Webmaster Tools:** https://www.bing.com/webmasters
  - Go to Sitemaps section  
  - Submit sitemap URL

### 5. Monitor Sitemap Status
- Check Google Search Console regularly
- Look for "Couldn't fetch" errors
- Verify all URLs are being indexed

---

## Troubleshooting

### Sitemap Not Found (404 Error)
- Verify `public/sitemap.xml` exists
- Check file is deployed to production
- Ensure no `.gitignore` rules blocking it

### Search Engine Can't Access Sitemap
- Verify `robots.txt` has correct sitemap URL
- Test sitemap URL in browser
- Check for CORS issues (if using edge function)

### URLs Not Being Indexed
- Verify URLs return 200 status (not 404)
- Check robots.txt isn't blocking URLs
- Ensure pages have proper meta tags
- Give Google 1-2 weeks to crawl

### Dynamic Sitemap Shows Old Data
- Edge function caches may need clearing
- Verify database queries are correct
- Check RLS policies allow public access to published content

### Live Domain Shows "Account Suspended" Page
- Symptom: `robots.txt`, `/sitemap-index.xml`, or `/sitemap-images.xml` return an HTML page saying "Account Suspended".
- Cause: Production hosting account or DNS misconfiguration; not a code issue.
- Impact: Search engines cannot read robots.txt or sitemaps reliably.
- Fix:
  - Verify the domain points to the active deployment (Lovable or your chosen host).
  - Resolve any hosting account suspension with the provider.
  - Re-publish the frontend so `public/robots.txt` and sitemap files are live.
  - Re-test: https://www.saunasplus.com/robots.txt and https://www.saunasplus.com/sitemap.xml

### Cross-Host Sitemap Limitations (Google Search Console)
- Google requires sitemaps to be on the same host as the site (or both hosts verified in GSC).
- Direct Supabase function URLs in robots.txt work for discovery, but GSC may reject submission if cross-host isn’t verified.
- Recommended now:
  - Submit only `https://www.saunasplus.com/sitemap.xml` in GSC (static index lives on same host).
  - That index points to dynamic function sitemaps. If GSC flags cross-host, ensure all sitemap endpoints resolve on the main domain via hosting rewrites, or keep a static sitemap on the main domain until routing is fixed.

---

## Future Enhancements (Phase 2E - Blog)

When blog is implemented, the dynamic sitemap will automatically include:

### Blog Posts
```xml
<url>
  <loc>https://www.saunasplus.com/blog/how-to-maintain-your-sauna</loc>
  <lastmod>2024-01-15</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
</url>
```

### Blog Categories
```xml
<url>
  <loc>https://www.saunasplus.com/blog/category/maintenance</loc>
  <lastmod>2024-01-15</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.5</priority>
</url>
```

### Blog Tags
```xml
<url>
  <loc>https://www.saunasplus.com/blog/tag/infrared-saunas</loc>
  <lastmod>2024-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.4</priority>
</url>
```

### Image Sitemap (Optional)
For advanced SEO, create a separate image sitemap:
- File: `public/sitemap-images.xml`
- Include all gallery images with metadata
- Reference in robots.txt

---

## Checklist for Adding New Pages

- [ ] Add URL to `public/sitemap.xml` (if using static)
- [ ] Set appropriate priority (see guidelines above)
- [ ] Set appropriate changefreq (see guidelines above)
- [ ] Update lastmod date
- [ ] Verify URL works and returns 200
- [ ] Add proper meta tags to new page (title, description)
- [ ] Deploy changes to production
- [ ] Test sitemap.xml loads correctly
- [ ] Resubmit sitemap to Google Search Console (optional but recommended)
- [ ] Update `SITEMAP.md` if it's a major new section

---

## Quick Reference

### Static Sitemap
- **Location:** `public/sitemap.xml`
- **Update:** Manual editing
- **Best for:** Sites with few dynamic pages (current situation)

### Dynamic Sitemap  
- **Location:** `supabase/functions/generate-sitemap/index.ts`
- **Update:** Automatic from database
- **Best for:** Sites with blog or frequently-added content (future)

### Current Status
- ✅ Static sitemap implemented with 30 URLs
- ✅ Dynamic edge function ready for future use
- ⏳ Switch to dynamic when blog is added (Phase 2E)

---

**Last Updated:** 2024-01-07
**Next Review:** When Phase 2E (Blog) is implemented
