export const GTM_CONTAINER_ID = 'GTM-5RQGG374';
export const GA4_PRIMARY = 'G-RZN58PQLNK';
export const GA4_SECONDARY = 'G-ZFFW9RVTRW';

export interface Variable {
  name: string;
  dataLayerName: string;
  usedIn: string[];
  description: string;
}

export interface Trigger {
  name: string;
  type: string;
  eventName: string;
  usedBy: string[];
  description: string;
}

export interface Tag {
  name: string;
  type: string;
  measurementId?: string;
  trigger: string;
  parameters?: { name: string; value: string }[];
  description: string;
  isConfig?: boolean;
}

export const VARIABLES: Variable[] = [
  {
    name: 'DLV - form_name',
    dataLayerName: 'form_name',
    usedIn: ['Form Submission events'],
    description: 'Captures which form was submitted (e.g., "contact", "newsletter")'
  },
  {
    name: 'DLV - button_name',
    dataLayerName: 'button_name',
    usedIn: ['Button Click events'],
    description: 'Captures the button identifier that was clicked'
  },
  {
    name: 'DLV - location',
    dataLayerName: 'location',
    usedIn: ['Phone Click, Email Click events'],
    description: 'Tracks where the click occurred (e.g., "header", "footer")'
  },
  {
    name: 'DLV - service_name',
    dataLayerName: 'service_name',
    usedIn: ['Service View events'],
    description: 'Identifies which service page is being viewed'
  },
  {
    name: 'DLV - blog_title',
    dataLayerName: 'blog_title',
    usedIn: ['Blog View events'],
    description: 'Captures the title of the blog post being viewed'
  },
  {
    name: 'DLV - blog_slug',
    dataLayerName: 'blog_slug',
    usedIn: ['Blog View events'],
    description: 'Captures the URL slug of the blog post'
  },
  {
    name: 'DLV - event_category',
    dataLayerName: 'event_category',
    usedIn: ['All custom events'],
    description: 'Groups events into categories for better organization'
  },
  {
    name: 'DLV - event_label',
    dataLayerName: 'event_label',
    usedIn: ['All custom events'],
    description: 'Provides additional context about the event'
  }
];

export const TRIGGERS: Trigger[] = [
  {
    name: 'CE - form_submission',
    type: 'Custom Event',
    eventName: 'form_submission',
    usedBy: ['Form Submission - Primary', 'Form Submission - Secondary'],
    description: 'Fires when any form is submitted on the site'
  },
  {
    name: 'CE - button_click',
    type: 'Custom Event',
    eventName: 'button_click',
    usedBy: ['Button Click - Primary', 'Button Click - Secondary'],
    description: 'Fires when tracked buttons are clicked'
  },
  {
    name: 'CE - phone_click',
    type: 'Custom Event',
    eventName: 'phone_click',
    usedBy: ['Phone Click - Primary', 'Phone Click - Secondary'],
    description: 'Fires when phone number links are clicked'
  },
  {
    name: 'CE - email_click',
    type: 'Custom Event',
    eventName: 'email_click',
    usedBy: ['Email Click - Primary', 'Email Click - Secondary'],
    description: 'Fires when email links are clicked'
  },
  {
    name: 'CE - view_service',
    type: 'Custom Event',
    eventName: 'view_service',
    usedBy: ['Service View - Primary', 'Service View - Secondary'],
    description: 'Fires when service pages are viewed'
  },
  {
    name: 'CE - view_blog',
    type: 'Custom Event',
    eventName: 'view_blog',
    usedBy: ['Blog View - Primary', 'Blog View - Secondary'],
    description: 'Fires when blog posts are viewed'
  }
];

export const TAGS: Tag[] = [
  {
    name: 'GA4 Config - Primary',
    type: 'Google Analytics: GA4 Configuration',
    measurementId: GA4_PRIMARY,
    trigger: 'Initialization - All Pages',
    description: 'Primary GA4 configuration tag - fires on every page',
    isConfig: true
  },
  {
    name: 'GA4 Config - Secondary',
    type: 'Google Analytics: GA4 Configuration',
    measurementId: GA4_SECONDARY,
    trigger: 'Initialization - All Pages',
    description: 'Secondary GA4 configuration tag - fires on every page',
    isConfig: true
  },
  {
    name: 'Form Submission - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - form_submission',
    parameters: [
      { name: 'form_name', value: '{{DLV - form_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks form submissions to primary GA4 property'
  },
  {
    name: 'Form Submission - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - form_submission',
    parameters: [
      { name: 'form_name', value: '{{DLV - form_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks form submissions to secondary GA4 property'
  },
  {
    name: 'Button Click - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - button_click',
    parameters: [
      { name: 'button_name', value: '{{DLV - button_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks button clicks to primary GA4 property'
  },
  {
    name: 'Button Click - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - button_click',
    parameters: [
      { name: 'button_name', value: '{{DLV - button_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks button clicks to secondary GA4 property'
  },
  {
    name: 'Phone Click - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - phone_click',
    parameters: [
      { name: 'location', value: '{{DLV - location}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks phone clicks to primary GA4 property'
  },
  {
    name: 'Phone Click - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - phone_click',
    parameters: [
      { name: 'location', value: '{{DLV - location}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks phone clicks to secondary GA4 property'
  },
  {
    name: 'Email Click - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - email_click',
    parameters: [
      { name: 'location', value: '{{DLV - location}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks email clicks to primary GA4 property'
  },
  {
    name: 'Email Click - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - email_click',
    parameters: [
      { name: 'location', value: '{{DLV - location}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks email clicks to secondary GA4 property'
  },
  {
    name: 'Service View - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - view_service',
    parameters: [
      { name: 'service_name', value: '{{DLV - service_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks service page views to primary GA4 property'
  },
  {
    name: 'Service View - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - view_service',
    parameters: [
      { name: 'service_name', value: '{{DLV - service_name}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks service page views to secondary GA4 property'
  },
  {
    name: 'Blog View - Primary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - view_blog',
    parameters: [
      { name: 'blog_title', value: '{{DLV - blog_title}}' },
      { name: 'blog_slug', value: '{{DLV - blog_slug}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks blog post views to primary GA4 property'
  },
  {
    name: 'Blog View - Secondary',
    type: 'Google Analytics: GA4 Event',
    trigger: 'CE - view_blog',
    parameters: [
      { name: 'blog_title', value: '{{DLV - blog_title}}' },
      { name: 'blog_slug', value: '{{DLV - blog_slug}}' },
      { name: 'event_category', value: '{{DLV - event_category}}' },
      { name: 'event_label', value: '{{DLV - event_label}}' }
    ],
    description: 'Tracks blog post views to secondary GA4 property'
  }
];

export const TESTING_METHODS = [
  {
    title: 'GTM Preview Mode',
    description: 'The most comprehensive way to test your GTM setup',
    steps: [
      'Open Google Tag Manager',
      'Click "Preview" in the top right',
      'Enter your website URL',
      'Interact with your site in the new window',
      'Check the Tag Assistant tab to see which tags fire'
    ],
    whatToCheck: [
      'All tags fire on correct triggers',
      'Variables populate with correct values',
      'No error messages appear'
    ]
  },
  {
    title: 'Google Tag Assistant',
    description: 'Browser extension for real-time tag validation',
    steps: [
      'Install Google Tag Assistant extension',
      'Navigate to your website',
      'Click the extension icon',
      'Enable recording and interact with your site',
      'Review the recorded session'
    ],
    whatToCheck: [
      'GTM container loads successfully',
      'GA4 tags fire correctly',
      'No duplicate tags or errors'
    ]
  },
  {
    title: 'GA4 Real-Time Reports',
    description: 'See events as they happen in Google Analytics',
    steps: [
      'Open Google Analytics 4',
      'Navigate to Reports > Realtime',
      'Interact with your website',
      'Watch events appear in real-time',
      'Check both GA4 properties'
    ],
    whatToCheck: [
      'Events appear within 30 seconds',
      'Event parameters are correct',
      'Both properties receive data'
    ]
  },
  {
    title: 'Browser Console',
    description: 'Direct inspection of the dataLayer',
    steps: [
      'Open browser DevTools (F12)',
      'Go to Console tab',
      'Type: window.dataLayer',
      'Interact with your site',
      'Check new dataLayer entries'
    ],
    whatToCheck: [
      'dataLayer array exists',
      'Events push correctly',
      'Parameters have expected values'
    ]
  }
];

export const TROUBLESHOOTING = [
  {
    issue: 'Tags not firing',
    causes: [
      'Trigger not configured correctly',
      'Event name mismatch',
      'Tag paused or not published'
    ],
    solutions: [
      'Check trigger event name matches dataLayer push exactly',
      'Verify trigger is attached to the tag',
      'Ensure container is published',
      'Use GTM Preview mode to debug'
    ]
  },
  {
    issue: 'Events missing parameters',
    causes: [
      'Variable not created',
      'Data layer variable name mismatch',
      'Event fired before variable set'
    ],
    solutions: [
      'Create all 8 required data layer variables',
      'Check variable names match exactly (case-sensitive)',
      'Verify parameters are added to tag configuration',
      'Use Preview mode to inspect variable values'
    ]
  },
  {
    issue: 'Data not reaching GA4',
    causes: [
      'Wrong Measurement ID',
      'Configuration tag not firing',
      'Event tag not linked to config tag'
    ],
    solutions: [
      'Verify Measurement IDs: G-RZN58PQLNK and G-ZFFW9RVTRW',
      'Check config tags fire on all pages',
      'Ensure event tags reference the correct config tag',
      'Check GA4 real-time reports (can take 30 seconds)'
    ]
  },
  {
    issue: 'Only one GA4 property receiving data',
    causes: [
      'Missing secondary configuration tag',
      'Event tags only created for one property',
      'Wrong trigger on secondary tags'
    ],
    solutions: [
      'Create both config tags (Primary and Secondary)',
      'Create event tags for BOTH properties (12 total)',
      'Verify each event has 2 tags (one per property)',
      'Check both GA4 dashboards in real-time'
    ]
  }
];
