import { format, parseISO } from 'date-fns';

export interface WebsiteAnalytics {
  totalVisitors: number;
  totalPageviews: number;
  avgPageviewsPerVisit: number;
  avgSessionDuration: number;
  bounceRate: number;
  visitorsData: Array<{ date: string; count: number }>;
  pageviewsData: Array<{ date: string; count: number }>;
  topPages: Array<{ page: string; views: number }>;
  topSources: Array<{ source: string; visits: number }>;
  deviceStats: Array<{ device: string; count: number }>;
}

export const fetchWebsiteAnalytics = async (startDate: Date, endDate: Date): Promise<WebsiteAnalytics | null> => {
  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startdate: format(startDate, 'yyyy-MM-dd'),
        enddate: format(endDate, 'yyyy-MM-dd'),
        granularity: 'daily'
      })
    });

    if (!response.ok) {
      console.error('Failed to fetch website analytics');
      return null;
    }

    const data = await response.json();
    
    // Parse the analytics data structure
    const visitors = data.data?.visitors || [];
    const pageviews = data.data?.pageviews || [];
    const pageviewsPerVisit = data.data?.pageviewsPerVisit || [];
    const sessionDuration = data.data?.sessionDuration || [];
    const bounceRate = data.data?.bounceRate || [];
    const breakdown = data.breakdown || {};

    // Process time series data
    const visitorsData = visitors.map((v: any) => ({
      date: format(parseISO(v.date || v.timestamp), 'MMM dd'),
      count: v.value || v.count || 0
    }));

    const pageviewsData = pageviews.map((p: any) => ({
      date: format(parseISO(p.date || p.timestamp), 'MMM dd'),
      count: p.value || p.count || 0
    }));

    // Calculate totals and averages
    const totalVisitors = visitors.reduce((sum: number, v: any) => sum + (v.value || v.count || 0), 0);
    const totalPageviews = pageviews.reduce((sum: number, p: any) => sum + (p.value || p.count || 0), 0);
    const avgPageviewsPerVisit = pageviewsPerVisit.length > 0
      ? pageviewsPerVisit.reduce((sum: number, p: any) => sum + (p.value || p.count || 0), 0) / pageviewsPerVisit.length
      : 0;
    const avgSessionDuration = sessionDuration.length > 0
      ? sessionDuration.reduce((sum: number, s: any) => sum + (s.value || s.count || 0), 0) / sessionDuration.length
      : 0;
    const avgBounceRate = bounceRate.length > 0
      ? bounceRate.reduce((sum: number, b: any) => sum + (b.value || b.count || 0), 0) / bounceRate.length
      : 0;

    // Process breakdown data
    const topPages = (breakdown.page || [])
      .map((p: any) => ({ page: p.name || p.page, views: p.value || p.count || 0 }))
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10);

    const topSources = (breakdown.source || [])
      .map((s: any) => ({ source: s.name || s.source || 'Direct', visits: s.value || s.count || 0 }))
      .sort((a: any, b: any) => b.visits - a.visits)
      .slice(0, 5);

    const deviceStats = (breakdown.device || [])
      .map((d: any) => ({ device: d.name || d.device, count: d.value || d.count || 0 }));

    return {
      totalVisitors,
      totalPageviews,
      avgPageviewsPerVisit: Math.round(avgPageviewsPerVisit * 10) / 10,
      avgSessionDuration: Math.round(avgSessionDuration),
      bounceRate: Math.round(avgBounceRate * 100),
      visitorsData,
      pageviewsData,
      topPages,
      topSources,
      deviceStats
    };
  } catch (error) {
    console.error('Error fetching website analytics:', error);
    return null;
  }
};
