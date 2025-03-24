export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  date: string;
  category: string;
  readTime: string;
  isFeatured?: boolean;
  tags?: string[];
} 