export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedAt: string;
  companyLogo: string;
  tags: string[];
  treatments: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  publishedAt: string;
  category: string;
  readTime: string;
}