import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { getHaulByUrl } from "../api/hauls"
import { Item } from '../types/item';
import { Haul } from '../types/haul';

const HaulDetails = () => {
  const { username, slug } = useParams();
  const [haul, setHaul] = useState<Haul | null>(null);
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchHaul = async () => {
      try {
        if (!username || !slug) {
          return;
        }
        const data = await getHaulByUrl(username, slug);
        setHaul(data.haul);
        setError('');
      } catch (err) {
        console.error('Error fetching haul:', err);
        setError('Haul not found.')
      }
    }
    fetchHaul();
  }, [username, slug]);

  if (error) {
    return <div className="place-self-center flex justify-center items-center text-xl">{error}</div>
  }

  if (!haul) {
    return <div className="place-self-center flex justify-center items-center text-xl">Loading...</div>
  }

  const formattedDate = format(haul.dateOfPurchase, 'EEEE, MMM d');

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <div className="w-full flex justify-start mb-4">
        <Link to='/' className="flex space-x-2 p-2 px-4 rounded-lg hover:bg-stone-200">
          <img src="/icons/arrow-left.svg" alt="back" className="w-5" />
          <p className="font-medium text-lg">Back</p>
        </Link>
      </div>
      <div className="w-full bg-white rounded-lg p-5 px-10 my-2">
        <Link to={`/${username}`} className="font-semibold text-cyan-600 hover:underline">@{username}</Link>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-2xl">{haul.storeName}</h4>
            <p className="text-stone-500">{formattedDate}</p>
          </div>
          
          <hr className="text-stone-200 mb-2" />
          <div className="flex justify-between">
            <ul className="space-y-2">
              {haul.items &&
                haul.items.map((item: Item, index) => (
                  <li key={index} className="flex border-b-1 border-b-stone-200">
                    <div className="w-sm flex space-x-2">
                      <img src="/icons/check-circle.svg" alt="check" className="w-4" />
                      {item.recommended && (
                        <img src="/icons/heart.svg" alt="recommended" className="w-4" />
                      )}
                      {item.onSale && (
                        <img src="/icons/tag.svg" alt="sale" className="w-4" />
                      )}
                      <p>{item.name}</p>
                    </div>
                    <div className="flex space-x-4">
                      <p>x{item.quantity}</p>
                      {item.price && (
                        <p>${item.price}</p>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
            {haul.notes && (
              <div className="w-2xs">
                <p className="italic">{haul.notes}</p>
              </div>
            )}
          </div>

          {(haul.images?.length ?? 0) > 0 && (
            <div className='mt-5'>
              <h3>Images</h3>
            </div>
          )}
        </div>
      </div>
    </div>

  )

}

export default HaulDetails;