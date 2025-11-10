# Google Analytics Tracking Implementation

## Overview
Google Analytics 4 (GA4) property ID: **G-RZN58PQLNK**

This document outlines all conversion tracking events implemented across the Saunas Plus website for comprehensive funnel analysis and conversion optimization.

---

## Tracked Events

### Page Views
**Event:** `page_view` (automatic)
- Triggered on every route change
- Tracks full path including query parameters
- Implemented via PageViewTracker component

---

### Button Clicks
**Event:** `button_click`

**Parameters:**
- `button_name`: Name of the button clicked
- `location`: Where the button appears on the site

**Tracked Buttons:**
1. **Hero Section**
   - "Free Consultation" (location: "Hero")
   - "Explore Our Work" (location: "Hero")

2. **CTA Section**
   - "Get Free Consultation" (location: "CTA Section")
   - "View Our Projects" (location: "CTA Section")

3. **Navigation (Desktop)**
   - "Free Consultation" (location: "Desktop Nav")

4. **Navigation (Mobile)**
   - "Free Consultation" (location: "Mobile Nav")

---

### Phone Number Clicks
**Event:** `phone_click`

**Parameters:**
- `event_category`: "engagement"
- `event_label`: "phone_number_click"

**Tracked Locations:**
- Footer phone number link
- Desktop navigation phone number
- Mobile navigation phone number

**Phone:** 678-245-9966

---

### Email Clicks
**Event:** `email_click`

**Parameters:**
- `event_category`: "engagement"
- `event_label`: "email_link_click"

**Tracked Locations:**
- Footer email link

**Email:** contact@saunasplus.com

---

### Form Interactions

#### Form Start
**Event:** `form_start`

**Parameters:**
- `form_name`: Name of the form

**Tracked Forms:**
- Contact Form (`form_name`: "contact_form")
  - Triggered on first field interaction
  - Helps measure form abandonment rate

#### Form Submission
**Event:** `form_submission`

**Parameters:**
- `form_name`: Name of the form

**Tracked Submissions:**
1. **Contact Form** (`form_name`: "contact_form")
   - Triggered after successful database insert
   - Represents qualified lead generation

2. **Newsletter Signup** (`form_name`: "newsletter_signup")
   - Triggered after successful email subscription
   - Represents email list growth

---

### Service Page Views
**Event:** `view_service`

**Parameters:**
- `service_name`: Name of the service

**Usage:** Track which services generate the most interest

---

### Blog Views
**Event:** `view_blog`

**Parameters:**
- `blog_title`: Title of the blog post
- `blog_slug`: URL slug of the post

**Usage:** Measure blog content engagement and popular topics

---

## Conversion Funnel Analysis

### Primary Conversion Path
1. **Landing** → `page_view`
2. **CTA Click** → `button_click`
3. **Form Start** → `form_start`
4. **Form Submit** → `form_submission`

### Alternative Conversion Paths
1. **Phone Call** → `phone_click`
2. **Email Contact** → `email_click`
3. **Newsletter** → `form_submission` (newsletter_signup)

---

## Key Metrics to Monitor

### Engagement Metrics
- Page views per session
- Button click rate by location
- Phone/email click rate
- Newsletter signup rate

### Conversion Metrics
- Form start rate (visitors who begin forms)
- Form completion rate (start → submission)
- Contact form conversion rate
- Phone click conversion rate

### Content Metrics
- Popular service pages
- Blog post engagement
- Time on page by section

---

## GA4 Dashboard Recommendations

### Custom Reports to Create

1. **Conversion Funnel Report**
   - Sequence: page_view → button_click → form_start → form_submission
   - Goal: Identify drop-off points

2. **CTA Performance Report**
   - Group by `location` parameter
   - Compare Hero vs CTA Section vs Navigation
   - Goal: Optimize CTA placement

3. **Lead Source Report**
   - Form submissions by landing page
   - Phone clicks by referrer
   - Goal: Understand best traffic sources

4. **Engagement Heat Map**
   - Button clicks by location
   - Phone/email clicks by page
   - Goal: Identify high-intent pages

---

## Custom Conversions to Set Up in GA4

1. **Primary Conversion - Contact Form Submission**
   - Event: `form_submission`
   - Condition: `form_name` = "contact_form"
   - Type: Key event

2. **Phone Call Intent**
   - Event: `phone_click`
   - Type: Key event

3. **Email Intent**
   - Event: `email_click`
   - Type: Key event

4. **Form Start (Micro-conversion)**
   - Event: `form_start`
   - Condition: `form_name` = "contact_form"
   - Type: Engagement metric

5. **Newsletter Subscriber**
   - Event: `form_submission`
   - Condition: `form_name` = "newsletter_signup"
   - Type: Secondary conversion

---

## Event Tracking Utilities

All tracking functions are centralized in `/src/utils/analytics.ts`:

```typescript
trackPageView(path: string)
trackFormSubmission(formName: string)
trackButtonClick(buttonName: string, location?: string)
trackPhoneClick()
trackEmailClick()
trackServiceView(serviceName: string)
trackBlogView(blogTitle: string, blogSlug: string)
```

---

## Testing & Verification

### Real-time Testing
1. Open Google Analytics 4 property
2. Navigate to Reports → Realtime
3. Perform actions on site
4. Verify events appear in real-time view

### Debug Mode (Chrome)
1. Install Google Analytics Debugger extension
2. Open developer console
3. Look for `gtag` messages
4. Verify parameters are correct

---

## Next Steps

### Recommended Enhancements
1. Set up GA4 conversion goals for key events
2. Create custom audiences for retargeting
3. Link to Google Ads for conversion tracking
4. Set up enhanced ecommerce (if/when shop is added)
5. Create calculated metrics for conversion rates
6. Set up alerts for conversion drops

### A/B Testing Opportunities
- Test CTA button copy ("Free Consultation" vs "Get Started")
- Test CTA placement (Hero vs inline)
- Test form length (short vs detailed)
- Test phone number prominence

---

*Last Updated: November 2025*
*Version: 1.0*
