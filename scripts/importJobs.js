import { scrapeJobs, importJobsToSupabase } from '../src/services/scrapingService.ts';

// List of job boards to scrape
const JOB_BOARDS = [
  'https://example.com/aesthetic-nursing-jobs',
  // Add more job board URLs here
];

async function importAllJobs() {
  try {
    console.log('Starting job import...');
    
    for (const url of JOB_BOARDS) {
      console.log(`Scraping jobs from ${url}...`);
      const jobs = await scrapeJobs(url);
      console.log(`Found ${jobs.length} jobs`);
      
      await importJobsToSupabase(jobs);
      console.log(`Imported jobs from ${url}`);
      
      // Wait between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('Job import completed successfully!');
  } catch (error) {
    console.error('Error during job import:', error);
    process.exit(1);
  }
}

importAllJobs();