import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify user is admin
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🏥 Starting content health monitoring...');

    // Fetch all indexed content
    const { data: allContent, error: contentError } = await supabase
      .from('site_content')
      .select('*');

    if (contentError) throw contentError;

    const now = new Date();
    const staleThreshold = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000)); // 180 days

    // Identify issues
    const orphanedPages = allContent.filter(item => {
      const relatedPages = item.related_pages as any[];
      return !relatedPages || relatedPages.length === 0;
    });

    const staleContent = allContent.filter(item => {
      const lastModified = new Date(item.last_modified_at || item.created_at);
      return lastModified < staleThreshold;
    });

    const missingMetadata = allContent.filter(item => {
      return !item.main_keywords || item.main_keywords.length === 0 || !item.content_summary;
    });

    const brokenRelationships = allContent.filter(item => {
      const relatedPages = item.related_pages as any[];
      if (!relatedPages || relatedPages.length === 0) return false;

      // Check if any related page URLs don't exist in our content
      const allUrls = allContent.map(c => c.url);
      return relatedPages.some((related: any) => 
        !allUrls.includes(related.url || related)
      );
    });

    const totalIssues = 
      orphanedPages.length + 
      staleContent.length + 
      missingMetadata.length + 
      brokenRelationships.length;

    console.log(`📊 Health Check Results:
      - Total Pages: ${allContent.length}
      - Orphaned Pages: ${orphanedPages.length}
      - Stale Content: ${staleContent.length}
      - Missing Metadata: ${missingMetadata.length}
      - Broken Relationships: ${brokenRelationships.length}
      - Total Issues: ${totalIssues}
    `);

    // Get top 5 pages needing attention (prioritize orphaned + missing metadata)
    const topIssues = [
      ...orphanedPages.slice(0, 3).map(p => ({
        url: p.url,
        title: p.title,
        issue: 'No incoming links (orphaned)'
      })),
      ...missingMetadata.slice(0, 2).map(p => ({
        url: p.url,
        title: p.title,
        issue: 'Missing keywords or summary'
      }))
    ];

    // Send email notification via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (RESEND_API_KEY) {
      const emailBody = `
        <h2>Content Health Report</h2>
        <p>Here's your weekly content health summary:</p>
        
        <h3>Overview</h3>
        <ul>
          <li>Total Pages: ${allContent.length}</li>
          <li>Total Issues: ${totalIssues}</li>
        </ul>

        <h3>Issues by Type</h3>
        <ul>
          <li>Orphaned Pages (no incoming links): ${orphanedPages.length}</li>
          <li>Stale Content (>180 days old): ${staleContent.length}</li>
          <li>Missing Metadata: ${missingMetadata.length}</li>
          <li>Broken Relationships: ${brokenRelationships.length}</li>
        </ul>

        <h3>Top 5 Pages Needing Attention</h3>
        <ol>
          ${topIssues.map(issue => `
            <li>
              <strong>${issue.title}</strong><br>
              URL: ${issue.url}<br>
              Issue: ${issue.issue}
            </li>
          `).join('')}
        </ol>

        <p>
          <a href="${Deno.env.get('SUPABASE_URL')}/admin/content-knowledge" style="
            background-color: #6366f1;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
          ">
            View Content Knowledge Base
          </a>
        </p>
      `;

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Saunas Plus <noreply@saunasplus.com>',
          to: ['admin@saunasplus.com'],
          subject: `Content Health Report: ${totalIssues} Issues Found`,
          html: emailBody
        })
      });

      if (!emailRes.ok) {
        console.error('Failed to send email:', await emailRes.text());
      } else {
        console.log('✉️ Health report email sent successfully');
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          totalPages: allContent.length,
          totalIssues,
          orphanedPages: orphanedPages.length,
          staleContent: staleContent.length,
          missingMetadata: missingMetadata.length,
          brokenRelationships: brokenRelationships.length
        },
        topIssues
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Error monitoring content health:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
