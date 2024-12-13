export const SCRAPINGBEE_API_KEY = import.meta.env.SCRAPINGBEE_API_KEY || 'QLIIHWA43LQW9HK4IUYVLKUCV22VFWKL4BOFW0T1DQHBR8EAM8WG1DI3RPOIY46Z7CAQU5GHV5SN8903';

export const JOB_BOARDS = [
  {
    name: 'Indeed',
    url: 'https://www.indeed.com/jobs?q=aesthetic+nurse&l=',
    selectors: {
      jobListing: '.job_seen_beacon',
      title: '.jobTitle',
      company: '.companyName',
      location: '.companyLocation',
      salary: '.salary-snippet',
      description: '.job-snippet',
      link: 'h2.jobTitle a'
    }
  },
  {
    name: 'ZipRecruiter',
    url: 'https://www.ziprecruiter.com/Jobs/Aesthetic-Nurse',
    selectors: {
      jobListing: '.job_content',
      title: '.job_title',
      company: '.hiring_company',
      location: '.location',
      salary: '.salary',
      description: '.job_description',
      link: '.job_link'
    }
  }
];