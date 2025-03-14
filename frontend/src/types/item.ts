export interface Item {
  name: string;
  quantity: number;
  price?: string;
  recommended: boolean;
  onSale: boolean;
}

export interface ItemInputProps {
  item: Item;
  index?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void;
  onToggle: (field: 'recommended' | 'onSale', index?: number) => void;
  onAdd?: () => void;
}