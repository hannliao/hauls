import { Item } from './item';
import { Comment } from './comment';

export interface Haul {
  id: string;
  dateOfPurchase: string; // Keeping as string since DateTime is usually serialized as a string in APIs
  storeName: string;
  slug: string;
  notes?: string;
  images?: string[];
  userId: string;
  items: Item[];
  comments: Comment[];
}

export interface HaulState {
  dateOfPurchase: string,
  storeName: string;
  notes: string;
  images: File[];    // tracks files for upload
  items: Item[];
  errors: string[];
}

export interface HaulFormData {
  dateOfPurchase: string;
  storeName: string;
  notes?: string;
  images: string[];    // converted to URLs
  items: Item[];
}

export interface HaulCardProps {
  dateOfPurchase: string;
  storeName: string;
  slug: string;
  userId: string;
  items: Item[];
  notes?: string;
}