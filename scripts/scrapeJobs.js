import { startJobScraping } from '../src/services/scrapingService.js';

async function main() {
  try {
    console.log('Starting job scraping script...');
    await startJobScraping();
    console.log('Job scraping completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running job scraper:', error);
    process.exit(1);
  }
}

main();