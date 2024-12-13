import type { Job } from '../types';

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Lead Aesthetic Nurse Injector',
    company: 'Luxe Medical Spa',
    location: 'Beverly Hills, CA',
    salary: '$140k - $200k + Commission',
    type: 'Full-time',
    description: 'Join our luxury medical spa as a lead injector. We\'re seeking an experienced aesthetic nurse with expertise in dermal fillers, Botox, and advanced facial treatments. Competitive commission structure and benefits package.',
    postedAt: '2024-03-10T10:00:00Z',
    companyLogo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=128&h=128&fit=crop',
    tags: ['Botox', 'Dermal Fillers', 'Leadership', 'Medical Spa'],
    treatments: ['Botox/Neurotoxins', 'Dermal Fillers', 'PDO Threads', 'Chemical Peels']
  },
  {
    id: 2,
    title: 'Aesthetic Nurse Practitioner',
    company: 'Elite Dermatology',
    location: 'Miami, FL',
    salary: '$130k - $180k',
    type: 'Full-time',
    description: 'Premier dermatology practice seeking a skilled nurse practitioner specializing in cosmetic procedures. Experience with laser treatments, chemical peels, and injectables required. Flexible schedule available.',
    postedAt: '2024-03-09T15:30:00Z',
    companyLogo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=128&h=128&fit=crop',
    tags: ['Laser Treatments', 'Chemical Peels', 'Injectables', 'Dermatology'],
    treatments: ['Laser Treatments', 'Chemical Peels', 'Microneedling', 'PRP/PRF']
  },
  {
    id: 3,
    title: 'Cosmetic Nurse Injector',
    company: 'Radiance Plastic Surgery',
    location: 'New York, NY',
    salary: '$120k - $160k + Bonus',
    type: 'Full-time',
    description: 'Seeking an experienced nurse injector for our upscale plastic surgery center. Must be proficient in facial anatomy and advanced injection techniques. Training opportunities available.',
    postedAt: '2024-03-08T09:15:00Z',
    companyLogo: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=128&h=128&fit=crop',
    tags: ['Facial Anatomy', 'Advanced Techniques', 'Plastic Surgery'],
    treatments: ['Botox/Neurotoxins', 'Dermal Fillers', 'Body Contouring']
  }
];