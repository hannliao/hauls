import { format } from 'date-fns';
import { Link } from "react-router";
import { HaulCardProps } from "../types/haul";
import { Item } from '../types/item';

const HaulCard: React.FC<HaulCardProps> = ({ haul }) => {
  const {dateOfPurchase, storeName, slug, username, items, notes} = haul;
  const formattedDate = format(dateOfPurchase, 'EEEE, MMM d');

  return (
    <div className="w-full bg-white rounded-lg p-5 px-10 my-2">
      <Link to={`/${username}`} className="font-semibold text-sm text-cyan-600 hover:underline">@{username}</Link>
      <Link to={`/${username}/${slug}`}>
        <div className="flex justify-between">
          <h4 className="font-bold text-lg">{storeName}</h4>
          <p className="text-sm text-stone-500">{formattedDate}</p>
        </div>
        
        <hr className="text-stone-200 mb-2" />
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
      </ Link>
    </div>
  )
}

export default HaulCard;