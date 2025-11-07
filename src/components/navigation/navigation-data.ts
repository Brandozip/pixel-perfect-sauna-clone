export const navigationLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Services', 
    path: '/services',
    children: [
      { name: 'Custom Sauna Design', path: '/services/custom-sauna-design' },
      { name: 'Custom Sauna Installation', path: '/services/custom-sauna-installation' },
      { name: 'Steam Shower Installation', path: '/services/steam-shower-installation' },
      { name: 'Residential Sauna Builds', path: '/services/residential-sauna-builds' },
      { name: 'Outdoor Sauna Kits', path: '/services/outdoor-sauna-kits' },
      { name: 'Indoor Infrared Sauna', path: '/services/indoor-infrared-sauna' },
    ]
  },
  { 
    name: 'Health Benefits', 
    path: '/health-benefits',
    children: [
      { name: 'Detoxification', path: '/health-benefits/detoxification' },
      { name: 'Mental Health', path: '/health-benefits/mental-health' },
      { name: 'Cardiovascular Health', path: '/health-benefits/cardiovascular' },
      { name: 'Muscle Recovery', path: '/health-benefits/muscle-recovery' },
      { name: 'Immune System', path: '/health-benefits/immune-system' },
      { name: 'Anti-Aging', path: '/health-benefits/anti-aging' },
      { name: 'Chronic Pain Relief', path: '/health-benefits/chronic-pain-relief' },
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];
