import { format } from 'date-fns';
import { Link } from "react-router";
import { HaulCardProps } from "../types/haul";
import { Item } from '../types/item';

const HaulCard: React.FC<HaulCardProps> = ({ dateOfPurchase, storeName, slug, username, items, notes}) => {
  const formattedDate = format(dateOfPurchase, 'MMM d, yyyy');

  return (
    <div className="bg-white rounded-lg p-4 m-2">
      <Link to={`${slug}`}>
        <Link to="/username" className="font-medium text-cyan-600">@{username}</Link>
        <h4 className="font-semibold text-lg">{storeName}</h4>
        <p className="text-sm text-stone-500">{formattedDate}</p>
      </ Link>
      <div>
        <ul>
          {items &&
            items.map((item: Item, index) => (
              <li key={index} className="flex space-x-2">
                <img src="/icons/check-circle.svg" alt="check" className="w-4" />
                {item.recommended && (
                  <img src="/icons/heart.svg" alt="recommended" className="w-4" />
                )}
                {item.onSale && (
                  <img src="/icons/tag.svg" alt="sale" className="w-4" />
                )}
                <p>{item.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default HaulCard;