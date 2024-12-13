import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { ScrapingBeeClient } from 'https://esm.sh/scrapingbee@1.7.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JOB_BOARDS = [
  'https://www.indeed.com/jobs?q=aesthetic+nurse&l=',
  'https://www.ziprecruiter.com/Jobs/Aesthetic-Nurse',
  // Add more job boards as needed
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const scrapingBeeClient = new ScrapingBeeClient(
      Deno.env.get('SCRAPINGBEE_API_KEY') ?? ''
    );

    const results = [];

    for (const url of JOB_BOARDS) {
      try {
        const response = await scrapingBeeClient.get({
          url,
          params: {
            render_js: true,
            extract_rules: {
              jobs: {
                selector: '.job-listing',
                type: 'list',
                output: {
                  title: '.job-title',
                  company: '.company-name',
                  location: '.location',
                  salary: '.salary',
                  type: '.job-type',
                  description: '.description',
                  company_logo: { selector: 'img.company-logo', output: '@src' },
                  tags: { selector: '.tags span', type: 'list' },
                  treatments: { selector: '.treatments span', type: 'list' },
                  source_url: { selector: 'a.job-link', output: '@href' }
                }
              }
            }
          }
        });

        const jobs = response.data.jobs;
        
        // Insert new jobs
        const { error } = await supabaseClient
          .from('jobs')
          .upsert(
            jobs.map(job => ({
              ...job,
              imported: true,
              created_at: new Date().toISOString()
            })),
            { onConflict: 'source_url' }
          );

        if (error) throw error;
        
        results.push({
          source: url,
          jobsFound: jobs.length,
          status: 'success'
        });
      } catch (error) {
        results.push({
          source: url,
          error: error.message,
          status: 'error'
        });
      }

      // Wait between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return new Response(
      JSON.stringify({ results }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});