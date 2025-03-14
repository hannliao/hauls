export interface Comment {
  id: string;
  text: string;
  timestamp: string; // Keeping as string since DateTime is serialized in JSON
  userId: string;
  haulId: string;
  parentId?: string;
  replies: Comment[];
}
