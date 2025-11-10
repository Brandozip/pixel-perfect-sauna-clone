# GA4 Conversion Goals & Key Events Setup Guide

## Overview
This guide provides step-by-step instructions for configuring conversion goals and key events in Google Analytics 4 for the Saunas Plus website.

**GA4 Property ID:** G-RZN58PQLNK

---

## Prerequisites
- Access to Google Analytics 4 account
- Editor or Administrator role
- Events must be firing (verify in Realtime reports first)

---

## Step 1: Access GA4 Admin Panel

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your GA4 property (G-RZN58PQLNK)
3. Click **Admin** (gear icon) in the bottom left
4. Under "Property" column, click **Events**

---

## Step 2: Mark Key Events (Conversions)

Google Analytics 4 uses "Key Events" (formerly called "Conversions") to track important user actions.

### Primary Conversion: Contact Form Submission

**Event Name:** `form_submission`

**Setup Steps:**
1. In Events list, find `form_submission`
2. Toggle the **"Mark as key event"** switch to ON
3. This event fires when:
   - Contact form is successfully submitted
   - Newsletter signup is completed

**Why This Matters:**
- Primary lead generation metric
- Measures form effectiveness
- Tracks conversion rate by traffic source

**Expected Volume:** 5-20 per week initially

---

### High-Intent Conversion: Phone Click

**Event Name:** `phone_click`

**Setup Steps:**
1. In Events list, find `phone_click`
2. Toggle the **"Mark as key event"** switch to ON
3. This event fires when users click phone numbers in:
   - Navigation (desktop & mobile)
   - Footer
   - Contact page

**Why This Matters:**
- Direct conversion intent (call)
- High-value lead indicator
- Often leads to immediate sales

**Expected Volume:** 10-30 per week

---

### Micro-Conversion: Email Click

**Event Name:** `email_click`

**Setup Steps:**
1. In Events list, find `email_click`
2. Toggle the **"Mark as key event"** switch to ON
3. This event fires when users click email links

**Why This Matters:**
- Alternative contact method
- Shows interest level
- Complements phone tracking

**Expected Volume:** 5-15 per week

---

### Engagement Metric: Button Clicks

**Event Name:** `button_click`

**Setup Steps:**
1. In Events list, find `button_click`
2. Toggle the **"Mark as key event"** switch to ON
3. This tracks all CTA button clicks site-wide

**Why This Matters:**
- Measures CTA effectiveness
- Identifies high-performing locations
- Helps optimize button placement

**Parameters to Note:**
- `button_name`: What button was clicked
- `location`: Where on site (Hero, CTA Section, Nav, etc.)

**Expected Volume:** 50-150 per week

---

## Step 3: Create Custom Conversions (Advanced)

For more granular tracking, create custom conversions with conditions.

### Navigate to Conversions

1. Admin → Property Settings → **Events**
2. Click **Create event** (top right)

---

### Custom Conversion 1: Contact Form Only

**Name:** `contact_form_submission`

**Conditions:**
- Event name: `form_submission`
- Parameter: `form_name` equals `contact_form`

**Steps:**
1. Click "Create event"
2. Enter custom event name: `contact_form_submission`
3. Add matching condition:
   - Parameter: `form_name`
   - Operator: `equals`
   - Value: `contact_form`
4. Click "Create"
5. Mark as key event in Events list

**Use Case:** Separate contact forms from newsletter signups for accurate lead tracking

---

### Custom Conversion 2: Newsletter Subscription

**Name:** `newsletter_subscription`

**Conditions:**
- Event name: `form_submission`
- Parameter: `form_name` equals `newsletter_signup`

**Steps:**
1. Click "Create event"
2. Enter custom event name: `newsletter_subscription`
3. Add matching condition:
   - Parameter: `form_name`
   - Operator: `equals`
   - Value: `newsletter_signup`
4. Click "Create"
5. Mark as key event in Events list

**Use Case:** Track email list growth separately from lead generation

---

### Custom Conversion 3: High-Intent Actions

**Name:** `high_intent_engagement`

**Conditions:**
- Event name: `phone_click` OR `email_click` OR `button_click` with location "Hero"

**Steps:**
1. Click "Create event"
2. Enter custom event name: `high_intent_engagement`
3. Add matching conditions (use OR logic):
   - Condition 1: Event name equals `phone_click`
   - Condition 2: Event name equals `email_click`
   - Condition 3: Event name equals `button_click` AND parameter `location` equals `Hero`
4. Click "Create"
5. Mark as key event

**Use Case:** Combined metric for users showing strong purchase intent

---

## Step 4: Assign Conversion Values (Optional)

Assign monetary values to conversions for ROI calculations.

### Recommended Values

1. **Contact Form Submission:** $50-100
   - Average lead value based on conversion rate
   - Adjust based on your close rate

2. **Phone Click:** $75-150
   - Higher than form (more qualified)
   - Immediate intent to purchase

3. **Email Click:** $25-50
   - Lower urgency than phone
   - Still shows interest

4. **Newsletter Subscription:** $10-20
   - Long-term nurture value
   - Email marketing ROI

### How to Set Values

1. Go to Admin → Events
2. Click on the event name
3. Scroll to "Event value"
4. Enter your dollar amount
5. Click "Save"

**Note:** Values help calculate ROAS (Return on Ad Spend) for paid campaigns

---

## Step 5: Set Up Audiences for Remarketing

Create audiences based on conversion events for retargeting.

### Audience 1: Form Started But Not Submitted

**Purpose:** Retarget users who showed interest but didn't convert

**Conditions:**
- Include: Users who triggered `form_start`
- Exclude: Users who triggered `form_submission`
- Time window: Last 7 days

**Use For:**
- Facebook/Instagram retargeting ads
- Google Display Network remarketing
- Email campaigns (if captured)

---

### Audience 2: Phone Clickers

**Purpose:** Users who clicked phone but didn't call (or called and need follow-up)

**Conditions:**
- Include: Users who triggered `phone_click`
- Time window: Last 14 days

**Use For:**
- High-intent remarketing campaigns
- Premium service promotions
- Urgent offer campaigns

---

### Audience 3: Newsletter Subscribers

**Purpose:** Nurture leads with content

**Conditions:**
- Include: Users who triggered `newsletter_subscription`
- Time window: Last 30 days

**Use For:**
- Content marketing campaigns
- Educational drip sequences
- Product launches

---

## Step 6: Create Custom Reports

### Report 1: Conversion Funnel

**Path:** Explore → Funnel Exploration

**Steps:**
1. Step 1: `page_view` (any page)
2. Step 2: `button_click`
3. Step 3: `form_start`
4. Step 4: `form_submission`

**Insights:**
- Where users drop off
- Conversion rate by step
- Time between steps

---

### Report 2: CTA Performance

**Path:** Explore → Free Form

**Dimensions:**
- Event name: `button_click`
- Event parameter: `location`

**Metrics:**
- Event count
- Conversion rate (form_submission / button_click)

**Insights:**
- Which CTAs convert best
- Optimal button placement
- A/B test results

---

### Report 3: Lead Source Analysis

**Path:** Explore → Free Form

**Dimensions:**
- Session source/medium
- Landing page

**Metrics:**
- Key events (conversions)
- Conversion rate
- Revenue (if values assigned)

**Insights:**
- Best traffic sources for leads
- ROI by channel
- Which pages convert best

---

## Step 7: Link to Google Ads (If Running Ads)

### Benefits of Linking
- Import conversions to Google Ads
- Optimize campaigns for conversions
- Track ROAS accurately
- Create similar audiences

### Steps to Link

1. **In GA4:**
   - Admin → Product Links → Google Ads Links
   - Click "Link"
   - Select your Google Ads account
   - Enable "Personalized advertising"
   - Turn on "Import site metrics" (optional)

2. **Import Conversions:**
   - Once linked, conversions automatically sync
   - In Google Ads, go to Tools → Conversions
   - Verify GA4 conversions appear

3. **Set Conversion Actions:**
   - Choose which events to optimize for
   - Set primary conversion (contact_form_submission)
   - Set secondary conversions (phone_click)

---

## Step 8: Set Up Alerts

### Alert 1: Conversion Drop

**Purpose:** Get notified if conversions drop suddenly

**Setup:**
1. Go to Admin → Custom Alerts (if available)
2. Create alert:
   - Metric: Key events (conversions)
   - Condition: Decreases by more than 50%
   - Time period: Day over day
   - Send to: Your email

---

### Alert 2: Traffic Spike

**Purpose:** Catch viral moments or ad issues

**Setup:**
1. Create alert:
   - Metric: Sessions
   - Condition: Increases by more than 200%
   - Time period: Day over day

---

## Step 9: Testing & Verification

### Test Each Conversion

1. **Contact Form:**
   - Fill out contact form
   - Submit successfully
   - Check Realtime → Events
   - Verify `form_submission` fires with `form_name: contact_form`

2. **Phone Click:**
   - Click phone number in nav
   - Check Realtime → Events
   - Verify `phone_click` fires

3. **Newsletter:**
   - Enter email in newsletter form
   - Submit
   - Verify `form_submission` fires with `form_name: newsletter_signup`

4. **Button Clicks:**
   - Click each CTA button
   - Verify `button_click` fires with correct `location` parameter

### Verify Key Events

1. Go to Reports → Engagement → Conversions
2. Verify all key events appear in list
3. Check event counts match expectations
4. Verify attribution is working (source/medium)

---

## Step 10: Monthly Review Checklist

### Metrics to Monitor

- [ ] Total conversions (all types)
- [ ] Conversion rate by source
- [ ] Cost per conversion (if running ads)
- [ ] Form completion rate (form_start → form_submission)
- [ ] Phone click rate
- [ ] Most clicked CTAs (by location)
- [ ] Landing pages with highest conversion rate
- [ ] Bounce rate vs conversion rate correlation

### Optimization Actions

- [ ] Pause underperforming ad campaigns
- [ ] Increase budget on high-converting sources
- [ ] A/B test CTA copy on low-performing buttons
- [ ] Improve landing pages with high bounce rates
- [ ] Update remarketing audiences
- [ ] Refine conversion values based on actual close rates

---

## Quick Reference: Event Names

| Event Name | Description | Key Event? |
|------------|-------------|------------|
| `page_view` | Page loads | Optional |
| `button_click` | CTA clicked | Yes |
| `phone_click` | Phone number clicked | Yes |
| `email_click` | Email link clicked | Yes |
| `form_start` | User starts form | Optional |
| `form_submission` | Form submitted | Yes (Primary) |
| `view_service` | Service page viewed | Optional |
| `view_blog` | Blog post viewed | Optional |

---

## Common Issues & Solutions

### Issue 1: Events Not Showing Up

**Causes:**
- Events not firing in code
- GA4 tracking code not loaded
- Ad blockers preventing tracking

**Solutions:**
- Check browser console for errors
- Verify GA4 script in `<head>`
- Test in incognito mode
- Use GA Debugger Chrome extension

---

### Issue 2: Conversions Not Attributed

**Causes:**
- Cross-domain tracking not set up
- User cookies disabled
- Attribution window too short

**Solutions:**
- Check attribution settings in GA4
- Extend attribution window to 30-90 days
- Review cookie consent implementation

---

### Issue 3: Duplicate Events

**Causes:**
- Multiple GA4 tags firing
- Event triggered multiple times in code
- Tag manager misconfiguration

**Solutions:**
- Audit tracking code
- Check for duplicate GA4 scripts
- Review React component lifecycle

---

## ROI Calculation Formula

### Cost Per Conversion
```
Cost Per Conversion = Total Ad Spend / Total Conversions
```

### Return on Ad Spend (ROAS)
```
ROAS = Revenue from Conversions / Ad Spend
```

### Customer Acquisition Cost (CAC)
```
CAC = (Marketing Spend + Sales Spend) / Number of New Customers
```

### Conversion Rate
```
Conversion Rate = (Conversions / Total Visitors) × 100
```

---

## Support Resources

- **GA4 Help Center:** https://support.google.com/analytics
- **GA4 Academy:** https://analytics.google.com/analytics/academy/
- **Analytics Tracking Code:** `/src/utils/analytics.ts`
- **Tracking Documentation:** `ANALYTICS_TRACKING.md`

---

## Next Steps After Setup

1. ✅ Mark all key events as conversions
2. ✅ Assign conversion values
3. ✅ Create remarketing audiences
4. ✅ Set up custom reports
5. ✅ Link to Google Ads (if applicable)
6. ✅ Configure alerts
7. ✅ Test all conversions
8. ✅ Schedule monthly review
9. ✅ Share dashboard with team
10. ✅ Use insights to optimize campaigns

---

*Last Updated: November 2025*  
*Version: 1.0 - Initial Setup Guide*
