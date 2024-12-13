import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Aesthetic Nursing: Trends to Watch in 2024",
    slug: "future-aesthetic-nursing-2024",
    excerpt: "Explore the emerging trends shaping the aesthetic nursing industry, from advanced injection techniques to new treatment combinations.",
    content: `The aesthetic nursing field continues to evolve rapidly...`,
    author: {
      name: "Dr. Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
      role: "Clinical Director"
    },
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",
    publishedAt: "2024-03-01T08:00:00Z",
    category: "Industry Trends",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Building Your Personal Brand as an Aesthetic Nurse",
    slug: "building-personal-brand-aesthetic-nurse",
    excerpt: "Learn how to establish and grow your professional presence in the competitive world of aesthetic medicine.",
    content: `In today's digital age, personal branding is crucial...`,
    author: {
      name: "Jennifer Lopez, RN",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
      role: "Lead Injector"
    },
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop",
    publishedAt: "2024-02-28T10:00:00Z",
    category: "Career Growth",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Advanced Injection Techniques: A Comprehensive Guide",
    slug: "advanced-injection-techniques-guide",
    excerpt: "Master the latest injection techniques and best practices for optimal patient results.",
    content: `Mastering advanced injection techniques requires...`,
    author: {
      name: "Dr. Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop",
      role: "Medical Director"
    },
    coverImage: "https://images.unsplash.com/photo-1576091160291-bb5a93d37429?w=1200&h=630&fit=crop",
    publishedAt: "2024-02-25T09:00:00Z",
    category: "Clinical Skills",
    readTime: "10 min read"
  }
];