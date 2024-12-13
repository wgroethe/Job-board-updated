import { ScrapingBeeClient } from 'scrapingbee';
import { supabase } from '../lib/supabase';
import { SCRAPINGBEE_API_KEY, JOB_BOARDS } from '../config/constants';
import type { Job } from '../types';

const client = new ScrapingBeeClient(SCRAPINGBEE_API_KEY);

export async function scrapeJobs(url: string, selectors: any): Promise<Job[]> {
  try {
    console.log(`Scraping jobs from ${url}...`);
    
    const response = await client.get({
      url,
      params: {
        render_js: true,
        block_resources: false,
        extract_rules: {
          jobs: {
            selector: selectors.jobListing,
            type: 'list',
            output: {
              title: selectors.title,
              company: selectors.company,
              location: selectors.location,
              salary: selectors.salary,
              description: selectors.description,
              source_url: { selector: selectors.link, output: '@href' }
            }
          }
        }
      }
    });

    const jobs = response.data.jobs.map((job: any) => ({
      ...job,
      imported: true,
      created_at: new Date().toISOString(),
      type: detectJobType(job.description),
      treatments: detectTreatments(job.description)
    }));

    return jobs;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    throw error;
  }
}

export async function importJobsToSupabase(jobs: any[]) {
  try {
    // Filter out existing jobs
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('source_url')
      .in('source_url', jobs.map(job => job.source_url));

    const existingUrls = new Set(existingJobs?.map(job => job.source_url) || []);
    const newJobs = jobs.filter(job => !existingUrls.has(job.source_url));

    if (newJobs.length === 0) {
      console.log('No new jobs to import');
      return;
    }

    const { error } = await supabase
      .from('jobs')
      .insert(newJobs);

    if (error) throw error;
    console.log(`Successfully imported ${newJobs.length} new jobs`);
  } catch (error) {
    console.error('Error importing jobs to Supabase:', error);
    throw error;
  }
}

export async function startJobScraping() {
  console.log('Starting job scraping...');
  
  for (const board of JOB_BOARDS) {
    try {
      const jobs = await scrapeJobs(board.url, board.selectors);
      await importJobsToSupabase(jobs);
      
      // Wait between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error processing ${board.name}:`, error);
      continue;
    }
  }
  
  console.log('Job scraping completed');
}

// Helper functions
function detectJobType(description: string): string {
  const types = {
    'full-time': /full[- ]time|full$/i,
    'part-time': /part[- ]time|part$/i,
    'contract': /contract|temporary/i,
    'prn': /prn|as[- ]needed/i
  };

  for (const [type, pattern] of Object.entries(types)) {
    if (pattern.test(description)) {
      return type;
    }
  }

  return 'full-time'; // Default
}

function detectTreatments(description: string): string[] {
  const treatments = [
    'Botox', 'Neurotoxins', 'Dermal Fillers', 'PDO Threads',
    'Chemical Peels', 'Laser Treatments', 'Microneedling',
    'PRP', 'PRF', 'Body Contouring'
  ];

  return treatments.filter(treatment => 
    new RegExp(treatment, 'i').test(description)
  );
}