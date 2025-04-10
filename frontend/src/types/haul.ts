import { Item } from './item';
import { Comment } from './comment';

export interface Haul {
  id: string;
  dateOfPurchase: string;
  storeName: string;
  slug: string;
  notes?: string;
  images?: string[];
  userId: string;
  username: string;
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
  haul: Haul;
  showActions?: boolean;
  toggleModal?: (haulId: string | null) => void;
}

export interface DeleteHaulModalProps {
  onCancel: () => void;
  onDelete: () => void;
  isModalVisible: boolean;
}