export interface PostFormData {
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  featured: boolean;
  category?: string;
  tags: string[];
  zodiacSign?: string;
  difficulty?: string;
  humorLevel?: string;
  targetAudience?: string;
  readingTime?: number;
  coverImage?: string;
}

export interface Post extends PostFormData {
  id: string;
  pubDate: string;
  updatedDate: string;
  author: string;
}
