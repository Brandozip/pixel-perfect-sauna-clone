# Google Tag Manager Setup Guide

## Overview
This guide provides step-by-step instructions for configuring Google Tag Manager (GTM) for the Saunas Plus website. GTM is now implemented in the codebase and ready for container configuration.

**Current GA4 Properties:**
- Primary: `G-RZN58PQLNK`
- Secondary: `G-ZFFW9RVTRW`

---

## Prerequisites

✅ **Code Implementation Complete:**
- GTM container code installed in `index.html`
- Analytics utilities refactored to use `dataLayer` (see `src/utils/analytics.ts`)
- All tracking events preserved with same parameters

⚠️ **Action Required:**
You need to create and configure your GTM container (steps below).

---

## Step 1: Create GTM Container

1. **Go to Google Tag Manager:**
   - Visit [https://tagmanager.google.com](https://tagmanager.google.com)
   - Sign in with your Google account

2. **Create New Container:**
   - Click "Create Account" (if first time) or "Create Container"
   - Account Name: `Saunas Plus`
   - Container Name: `saunasplus.com` (or your domain)
   - Target Platform: **Web**
   - Click "Create"

3. **Get Your Container ID:**
   - After creation, you'll see your container ID (format: `GTM-XXXXXXX`)
   - **IMPORTANT:** Copy this ID

4. **Update Your Code:**
   - Open `index.html`
   - Find line 38: `})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>`
   - Replace `GTM-XXXXXXX` with your actual container ID
   - Also update line 156: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"`

---

## Step 2: Configure GA4 Tags

### Tag 1: Primary GA4 Configuration (G-RZN58PQLNK)

1. **In GTM, click "Tags" → "New"**
2. **Tag Configuration:**
   - Click "Tag Configuration" box
   - Select "Google Analytics: GA4 Configuration"
3. **Settings:**
   - Measurement ID: `G-RZN58PQLNK`
4. **Triggering:**
   - Click "Triggering" box
   - Select "Initialization - All Pages"
5. **Name the tag:** `GA4 Config - Primary (RZN58PQLNK)`
6. **Click "Save"**

### Tag 2: Secondary GA4 Configuration (G-ZFFW9RVTRW)

1. **Create another new tag**
2. **Tag Configuration:**
   - Select "Google Analytics: GA4 Configuration"
3. **Settings:**
   - Measurement ID: `G-ZFFW9RVTRW`
4. **Triggering:**
   - Select "Initialization - All Pages"
5. **Name the tag:** `GA4 Config - Secondary (ZFFW9RVTRW)`
6. **Click "Save"**

---

## Step 3: Create Data Layer Variables

Before creating event tags, set up these variables to capture data from the dataLayer:

1. **Go to "Variables" → "User-Defined Variables" → "New"**

2. **Create the following variables (one at a time):**

### Variable 1: form_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `form_name`
- Name: `DLV - form_name`

### Variable 2: button_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `button_name`
- Name: `DLV - button_name`

### Variable 3: location
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `location`
- Name: `DLV - location`

### Variable 4: service_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `service_name`
- Name: `DLV - service_name`

### Variable 5: blog_title
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `blog_title`
- Name: `DLV - blog_title`

### Variable 6: blog_slug
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `blog_slug`
- Name: `DLV - blog_slug`

### Variable 7: event_category
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `event_category`
- Name: `DLV - event_category`

### Variable 8: event_label
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `event_label`
- Name: `DLV - event_label`

---

## Step 4: Create Custom Event Triggers

1. **Go to "Triggers" → "New"**

2. **Create the following triggers (one at a time):**

### Trigger 1: Form Submission
- Trigger Type: **Custom Event**
- Event name: `form_submission`
- Name: `CE - form_submission`

### Trigger 2: Button Click
- Trigger Type: **Custom Event**
- Event name: `button_click`
- Name: `CE - button_click`

### Trigger 3: Phone Click
- Trigger Type: **Custom Event**
- Event name: `phone_click`
- Name: `CE - phone_click`

### Trigger 4: Email Click
- Trigger Type: **Custom Event**
- Event name: `email_click`
- Name: `CE - email_click`

### Trigger 5: Service View
- Trigger Type: **Custom Event**
- Event name: `view_service`
- Name: `CE - view_service`

### Trigger 6: Blog View
- Trigger Type: **Custom Event**
- Event name: `view_blog`
- Name: `CE - view_blog`

---

## Step 5: Create Event Tags (to Both GA4 Properties)

For each event below, you'll create **TWO tags** (one for each GA4 property).

### Event 1: Form Submission

**Tag 1a: Form Submission - Primary**
1. **New Tag → Tag Configuration**
2. **Select:** Google Analytics: GA4 Event
3. **Configuration Tag:** Select `GA4 Config - Primary (RZN58PQLNK)`
4. **Event Name:** `form_submission`
5. **Event Parameters:**
   - Parameter Name: `form_name`
   - Value: `{{DLV - form_name}}`
6. **Triggering:** `CE - form_submission`
7. **Name:** `GA4 Event - Form Submission (Primary)`

**Tag 1b: Form Submission - Secondary**
1. Repeat steps above
2. **Configuration Tag:** Select `GA4 Config - Secondary (ZFFW9RVTRW)`
3. **Name:** `GA4 Event - Form Submission (Secondary)`

---

### Event 2: Button Click

**Tag 2a: Button Click - Primary**
1. **New Tag → GA4 Event**
2. **Configuration Tag:** Primary
3. **Event Name:** `button_click`
4. **Event Parameters:**
   - Parameter Name: `button_name`, Value: `{{DLV - button_name}}`
   - Parameter Name: `location`, Value: `{{DLV - location}}`
5. **Triggering:** `CE - button_click`
6. **Name:** `GA4 Event - Button Click (Primary)`

**Tag 2b: Button Click - Secondary**
1. Same as above with Secondary configuration tag

---

### Event 3: Phone Click

**Tag 3a: Phone Click - Primary**
1. **New Tag → GA4 Event**
2. **Configuration Tag:** Primary
3. **Event Name:** `phone_click`
4. **Event Parameters:**
   - Parameter Name: `event_category`, Value: `{{DLV - event_category}}`
   - Parameter Name: `event_label`, Value: `{{DLV - event_label}}`
5. **Triggering:** `CE - phone_click`
6. **Name:** `GA4 Event - Phone Click (Primary)`

**Tag 3b: Phone Click - Secondary**
1. Same as above with Secondary configuration tag

---

### Event 4: Email Click

**Tag 4a: Email Click - Primary**
1. **New Tag → GA4 Event**
2. **Configuration Tag:** Primary
3. **Event Name:** `email_click`
4. **Event Parameters:**
   - Parameter Name: `event_category`, Value: `{{DLV - event_category}}`
   - Parameter Name: `event_label`, Value: `{{DLV - event_label}}`
5. **Triggering:** `CE - email_click`
6. **Name:** `GA4 Event - Email Click (Primary)`

**Tag 4b: Email Click - Secondary**
1. Same as above with Secondary configuration tag

---

### Event 5: Service View

**Tag 5a: Service View - Primary**
1. **New Tag → GA4 Event**
2. **Configuration Tag:** Primary
3. **Event Name:** `view_service`
4. **Event Parameters:**
   - Parameter Name: `service_name`, Value: `{{DLV - service_name}}`
5. **Triggering:** `CE - view_service`
6. **Name:** `GA4 Event - Service View (Primary)`

**Tag 5b: Service View - Secondary**
1. Same as above with Secondary configuration tag

---

### Event 6: Blog View

**Tag 6a: Blog View - Primary**
1. **New Tag → GA4 Event**
2. **Configuration Tag:** Primary
3. **Event Name:** `view_blog`
4. **Event Parameters:**
   - Parameter Name: `blog_title`, Value: `{{DLV - blog_title}}`
   - Parameter Name: `blog_slug`, Value: `{{DLV - blog_slug}}`
5. **Triggering:** `CE - view_blog`
6. **Name:** `GA4 Event - Blog View (Primary)`

**Tag 6b: Blog View - Secondary**
1. Same as above with Secondary configuration tag

---

## Step 6: Publish Your Container

1. **Click "Submit" (top right)**
2. **Version Name:** `Initial Setup - Dual GA4 + Events`
3. **Version Description:** `Configured both GA4 properties with all custom events`
4. **Click "Publish"**

---

## Step 7: Testing & Validation

### Method 1: GTM Preview Mode

1. **In GTM, click "Preview" (top right)**
2. **Enter your website URL**
3. **Click "Connect"**
4. **Test each event:**
   - Page loads → Should see both GA4 Config tags fire
   - Click buttons → Should see Button Click event
   - Click phone → Should see Phone Click event
   - Click email → Should see Email Click event
   - Submit form → Should see Form Submission event
   - View service page → Should see Service View event
   - View blog post → Should see Blog View event

### Method 2: Google Tag Assistant

1. **Install Google Tag Assistant Chrome extension**
2. **Visit your website**
3. **Open Tag Assistant**
4. **Verify:**
   - Both GA4 properties appear (G-RZN58PQLNK and G-ZFFW9RVTRW)
   - No errors shown
   - Events are tracked correctly

### Method 3: GA4 Real-Time Reports

1. **Go to Google Analytics**
2. **Open both GA4 properties**
3. **Navigate to Reports → Realtime**
4. **Perform actions on your site**
5. **Verify events appear in both properties:**
   - Page views
   - Custom events (form_submission, button_click, etc.)
   - Event parameters populated correctly

### Method 4: Browser Console

1. **Open browser Developer Tools (F12)**
2. **Go to Console tab**
3. **Type:** `dataLayer`
4. **You should see an array of events pushed**
5. **Each event should have:**
   - `event` property (e.g., "form_submission")
   - Relevant parameters (e.g., "form_name")

---

## Troubleshooting

### Tags Not Firing
- Check that container ID in `index.html` matches your GTM container
- Verify triggers are set up correctly
- Check Preview Mode to see if events are reaching GTM

### Events Missing Parameters
- Verify Data Layer Variables are configured correctly
- Check that variable names match exactly (case-sensitive)
- Look in Preview Mode → Variables tab to see current values

### Both GA4 Properties Not Receiving Data
- Verify both Configuration tags are set to fire on "Initialization - All Pages"
- Check that both GA4 Measurement IDs are correct
- Ensure each event tag is linked to BOTH configuration tags

### No Data in GA4 Real-Time
- Wait 1-2 minutes (slight delay is normal)
- Check that GA4 properties are active (not deleted/suspended)
- Verify you're looking at the correct property in GA4

---

## Summary of Tags to Create

| Tag Name | Type | Fires To | Trigger |
|----------|------|----------|---------|
| GA4 Config - Primary | GA4 Configuration | G-RZN58PQLNK | Initialization |
| GA4 Config - Secondary | GA4 Configuration | G-ZFFW9RVTRW | Initialization |
| GA4 Event - Form Submission (Primary) | GA4 Event | Primary | form_submission |
| GA4 Event - Form Submission (Secondary) | GA4 Event | Secondary | form_submission |
| GA4 Event - Button Click (Primary) | GA4 Event | Primary | button_click |
| GA4 Event - Button Click (Secondary) | GA4 Event | Secondary | button_click |
| GA4 Event - Phone Click (Primary) | GA4 Event | Primary | phone_click |
| GA4 Event - Phone Click (Secondary) | GA4 Event | Secondary | phone_click |
| GA4 Event - Email Click (Primary) | GA4 Event | Primary | email_click |
| GA4 Event - Email Click (Secondary) | GA4 Event | Secondary | email_click |
| GA4 Event - Service View (Primary) | GA4 Event | Primary | view_service |
| GA4 Event - Service View (Secondary) | GA4 Event | Secondary | view_service |
| GA4 Event - Blog View (Primary) | GA4 Event | Primary | view_blog |
| GA4 Event - Blog View (Secondary) | GA4 Event | Secondary | view_blog |

**Total: 14 tags (2 config + 12 event tags)**

---

## Benefits of GTM Implementation

✅ **Centralized Management:**
- All tracking managed in one interface
- No code deployments needed for changes
- Version control for tracking configuration

✅ **Multi-Property Support:**
- Both GA4 properties configured simultaneously
- Consistent tracking across both properties
- Easy to add/remove properties

✅ **Easy Testing:**
- Preview mode for debugging
- No need to deploy to test changes
- Safe environment for experimentation

✅ **Future Scalability:**
- Add Facebook Pixel, LinkedIn Tag, etc. without code changes
- A/B test tracking implementations
- Deploy third-party tags easily

---

## Next Steps

After completing this setup:

1. **Monitor both GA4 properties for 48 hours**
2. **Set up GA4 Conversions** (see `GA4_CONVERSION_SETUP_GUIDE.md`)
3. **Create custom audiences** for remarketing
4. **Set up GA4 reports** for funnel analysis
5. **Consider adding:**
   - Facebook Pixel (for Meta ads)
   - LinkedIn Insight Tag (for LinkedIn ads)
   - Hotjar or similar (for heatmaps)

---

## Support Resources

- [Google Tag Manager Help](https://support.google.com/tagmanager)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/ct-p/Google-Tag-Manager)
- [Analytics Tracking Documentation](./ANALYTICS_TRACKING.md)

---

*Last Updated: November 2025*
*Version: 1.0*
