export const POST_TYPES = ['give', 'need', 'lend', 'event', 'test'] as const;
export type PostType = (typeof POST_TYPES)[number];

export const CATEGORIES = [
  'kids',
  'home',
  'tools',
  'food',
  'books',
  'clothes',
  'furniture',
  'appliances',
  'other',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Town {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string | null;
  category: Category;
  locations: Town[];
  createdAt: string;
}

export interface CreatePostBody {
  type: PostType;
  title: string;
  description?: string;
  category: Category;
  locations: Town[];
}
