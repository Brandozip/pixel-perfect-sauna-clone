# Google Tag Manager Setup Guide

## Overview
This guide provides step-by-step instructions for configuring Google Tag Manager (GTM) for the Saunas Plus website. GTM is now implemented in the codebase and ready for container configuration.

**GA4 Property:** `G-RZN58PQLNK`

---

## Prerequisites

✅ **Code Implementation Complete:**
- GTM container code installed in `index.html`
- Container ID: `GTM-5RQGG374` (already configured)
- Analytics utilities refactored to use `dataLayer` (see `src/utils/analytics.ts`)
- All tracking events preserved with same parameters

📋 **Action Required:**
You need to configure your GTM container with the setup below.

---

## Step 1: Access Your GTM Container

1. **Go to Google Tag Manager:**
   - Visit [https://tagmanager.google.com](https://tagmanager.google.com)
   - Sign in with your Google account
   - Select your container: `GTM-5RQGG374`

---

## Step 2: Configure GA4 Tag

### GA4 Configuration Tag

1. **In GTM, click "Tags" → "New"**
2. **Tag Configuration:**
   - Click "Tag Configuration" box
   - Select "Google Analytics: GA4 Configuration"
3. **Settings:**
   - Measurement ID: `G-RZN58PQLNK`
4. **Triggering:**
   - Click "Triggering" box
   - Select "Initialization - All Pages"
5. **Name the tag:** `GA4 Config - Primary`
6. **Click "Save"**

---

## Step 3: Create Data Layer Variables

Before creating event tags, set up these variables to capture data from the dataLayer:

1. **Go to "Variables" → "User-Defined Variables" → "New"**

2. **Create the following 8 variables:**

### Variable 1: form_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `form_name`
- Variable Name: `DLV - form_name`

### Variable 2: button_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `button_name`
- Variable Name: `DLV - button_name`

### Variable 3: location
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `location`
- Variable Name: `DLV - location`

### Variable 4: service_name
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `service_name`
- Variable Name: `DLV - service_name`

### Variable 5: blog_title
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `blog_title`
- Variable Name: `DLV - blog_title`

### Variable 6: blog_slug
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `blog_slug`
- Variable Name: `DLV - blog_slug`

### Variable 7: event_category
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `event_category`
- Variable Name: `DLV - event_category`

### Variable 8: event_label
- Variable Type: **Data Layer Variable**
- Data Layer Variable Name: `event_label`
- Variable Name: `DLV - event_label`

**Total Variables to Create: 8**

---

## Step 4: Create Custom Event Triggers

These triggers listen for custom events pushed to the dataLayer by your website.

1. **Go to "Triggers" → "New"**

2. **Create the following 6 triggers:**

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

**Total Triggers to Create: 6**

---

## Step 5: Create Event Tags

Now create event tags to send data to your GA4 property.

### Event 1: Form Submission

1. **Create new tag**
2. **Tag Configuration:**
   - Select "Google Analytics: GA4 Event"
3. **Configuration Tag:** Select `GA4 Config - Primary`
4. **Event Name:** `form_submission`
5. **Event Parameters:**
   - Parameter: `form_name` | Value: `{{DLV - form_name}}`
   - Parameter: `event_category` | Value: `{{DLV - event_category}}`
   - Parameter: `event_label` | Value: `{{DLV - event_label}}`
6. **Triggering:** Select `CE - form_submission`
7. **Name:** `Form Submission - Primary`
8. **Save**

### Event 2: Button Click

1. **Create new tag**
2. **Tag Configuration:** Google Analytics: GA4 Event
3. **Configuration Tag:** `GA4 Config - Primary`
4. **Event Name:** `button_click`
5. **Event Parameters:**
   - `button_name` → `{{DLV - button_name}}`
   - `event_category` → `{{DLV - event_category}}`
   - `event_label` → `{{DLV - event_label}}`
6. **Triggering:** `CE - button_click`
7. **Name:** `Button Click - Primary`

### Event 3: Phone Click

1. **Create new tag**
2. **Tag Configuration:** Google Analytics: GA4 Event
3. **Configuration Tag:** `GA4 Config - Primary`
4. **Event Name:** `phone_click`
5. **Event Parameters:**
   - `location` → `{{DLV - location}}`
   - `event_category` → `{{DLV - event_category}}`
   - `event_label` → `{{DLV - event_label}}`
6. **Triggering:** `CE - phone_click`
7. **Name:** `Phone Click - Primary`

### Event 4: Email Click

1. **Create new tag**
2. **Tag Configuration:** Google Analytics: GA4 Event
3. **Configuration Tag:** `GA4 Config - Primary`
4. **Event Name:** `email_click`
5. **Event Parameters:**
   - `location` → `{{DLV - location}}`
   - `event_category` → `{{DLV - event_category}}`
   - `event_label` → `{{DLV - event_label}}`
6. **Triggering:** `CE - email_click`
7. **Name:** `Email Click - Primary`

### Event 5: Service View

1. **Create new tag**
2. **Tag Configuration:** Google Analytics: GA4 Event
3. **Configuration Tag:** `GA4 Config - Primary`
4. **Event Name:** `view_service`
5. **Event Parameters:**
   - `service_name` → `{{DLV - service_name}}`
   - `event_category` → `{{DLV - event_category}}`
   - `event_label` → `{{DLV - event_label}}`
6. **Triggering:** `CE - view_service`
7. **Name:** `Service View - Primary`

### Event 6: Blog View

1. **Create new tag**
2. **Tag Configuration:** Google Analytics: GA4 Event
3. **Configuration Tag:** `GA4 Config - Primary`
4. **Event Name:** `view_blog`
5. **Event Parameters:**
   - `blog_title` → `{{DLV - blog_title}}`
   - `blog_slug` → `{{DLV - blog_slug}}`
   - `event_category` → `{{DLV - event_category}}`
   - `event_label` → `{{DLV - event_label}}`
6. **Triggering:** `CE - view_blog`
7. **Name:** `Blog View - Primary`

**Total Event Tags to Create: 6**

---

## Step 6: Submit and Publish Container

1. **Click "Submit"** in the top right corner of GTM
2. **Version Name:** `Initial GA4 Setup - RZN58PQLNK`
3. **Version Description:** 
   ```
   - Added GA4 Configuration tag
   - Created 8 data layer variables
   - Created 6 custom event triggers
   - Created 6 event tags for tracking
   ```
4. **Click "Publish"**

---

## Step 7: Test & Validate

### Method 1: GTM Preview Mode

1. In GTM, click **"Preview"** (top right)
2. Enter your website URL
3. In the new window that opens, interact with your site
4. Check the "Tags Fired" section to verify:
   - `GA4 Config - Primary` fires on every page
   - Event tags fire on correct actions

### Method 2: Google Tag Assistant

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Click the extension icon
4. Click "Record"
5. Interact with your site
6. Stop recording and review results

### Method 3: GA4 Real-Time Reports

1. Open Google Analytics 4
2. Go to **Reports → Realtime**
3. Interact with your website
4. Events should appear within ~30 seconds
5. Verify all parameters are captured correctly

### Method 4: Browser Console

1. Open your website
2. Open DevTools (F12)
3. Go to Console tab
4. Type: `window.dataLayer`
5. Interact with your site
6. Check that new entries are pushed to dataLayer

---

## Troubleshooting

### Tags Not Firing

**Problem:** Tags don't fire in Preview Mode

**Solutions:**
- Check that trigger event name matches exactly (case-sensitive)
- Verify trigger is attached to the tag
- Ensure container is published
- Clear browser cache and try again

### Events Missing Parameters

**Problem:** Events fire but parameters are empty

**Solutions:**
- Verify all 8 data layer variables are created correctly
- Check variable names match exactly (e.g., `DLV - form_name`)
- Ensure parameters are added to tag configuration
- Use Preview mode to inspect variable values

### Data Not Reaching GA4

**Problem:** Tags fire in GTM but no data in GA4

**Solutions:**
- Verify Measurement ID is correct: `G-RZN58PQLNK`
- Check that Configuration tag fires on all pages
- Ensure event tags reference the Configuration tag
- Wait 24-48 hours for data to fully propagate (real-time should work immediately)

### No Data in Real-Time Reports

**Problem:** No events showing in GA4 Real-Time

**Solutions:**
- Verify you're looking at the correct GA4 property
- Check that configuration tag is firing first
- Ensure your IP isn't filtered in GA4 settings
- Wait 30-60 seconds after interaction
- Try in incognito mode (to bypass ad blockers)

---

## Summary

**What You Created:**
| Type | Count | Purpose |
|------|-------|---------|
| Configuration Tag | 1 | Initializes GA4 on all pages |
| Data Layer Variables | 8 | Captures event data |
| Custom Triggers | 6 | Listens for custom events |
| Event Tags | 6 | Sends events to GA4 |
| **Total** | **21** | Complete tracking setup |

---

## Benefits of GTM Implementation

✅ **Centralized Management:** All tracking code in one place  
✅ **Easy Updates:** Change tracking without code deployments  
✅ **Built-in Testing:** Preview mode for safe validation  
✅ **Future-Ready:** Easy to add more tracking tools  
✅ **Version Control:** Track changes and rollback if needed  
✅ **Team Collaboration:** Multiple users can manage tags

---

## Next Steps

### 1. Monitor GA4 Data
- Check Real-Time reports daily for first week
- Verify all events are tracking correctly
- Review event parameters for completeness

### 2. Set Up Conversions
- In GA4, mark key events as conversions:
  - `form_submission` (high priority)
  - `phone_click` (high priority)
  - `email_click` (high priority)

### 3. Create Audiences
- Use event parameters to segment users
- Build remarketing lists for ads
- Target high-intent visitors

### 4. Add More Tools (Optional)
- Facebook Pixel
- LinkedIn Insight Tag
- Twitter conversion tracking
- All can be added through GTM without touching code!

---

## Support Resources

- [GTM Documentation](https://support.google.com/tagmanager)
- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/ct-p/Google-Tag-Manager)
- [Saunas Plus Admin Dashboard](https://your-domain.com/admin/gtm-docs) - Interactive setup guide

---

**Last Updated:** November 2025  
**GTM Container ID:** GTM-5RQGG374  
**GA4 Property:** G-RZN58PQLNK
