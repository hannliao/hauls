import { useReducer, useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { createHaul } from '../api/hauls';
import { HaulContext } from '../contexts/HaulContext';
import { UserContext } from '../contexts/UserContext';
import { HaulState, HaulFormData } from '../types/haul';
import { Item } from '../types/item';
import ItemInput from './ItemInput';
import { uploadImages } from '../api/uploads';

type HaulAction = 
  | { type: 'UPDATE_FIELD'; field: keyof HaulState; value: string}
  | { type: 'SET_IMAGES'; images: File[] }
  | { type: 'SET_ERRORS'; errors: string[] }
  | { type: 'ADD_ITEM'; item: Item }
  | { type: 'UPDATE_ITEM'; index: number; field: string; value: any }
  | { type: 'REMOVE_ITEM'; index: number };

const initialState: HaulState = {
  dateOfPurchase: '',
  storeName: '',
  notes: '',
  images: [],
  items: [],
  errors: [],
};

const haulReducer = (state: HaulState, action: HaulAction): HaulState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_IMAGES':
      return { ...state, images: action.images };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item]};
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item, index) => 
          index === action.index ? { ...item, [action.field]: action.value} : item),
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, i) => i !== action.index)};
    default:
      return state;
  }
}

const NewHaulForm = () => {
  const [state, dispatch] = useReducer(haulReducer, initialState);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: '', recommended: false, onSale: false });
  const navigate = useNavigate();
  const { dateOfPurchase, storeName, items, notes, images, errors } = state;
  const { hauls, setHauls } = useContext(HaulContext);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No user context')
  }
  const { user, loading } = context;

  useEffect(() => {
    if (!loading && !user) {
        navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="place-self-center flex justify-center items-center text-xl">Loading...</div>
  }

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name as keyof HaulState, value })
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch({ type: 'SET_IMAGES', images: Array.from(e.target.files) });
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (index !== undefined) {
      const { name, value } = e.target;
      dispatch({
        type: 'UPDATE_ITEM',
        index,
        field: name,
        value,
      });
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }
  }

  const handleItemAdd = () => {
    if (!newItem.name.trim()) return;   // item needs to have a name
    dispatch({ type: 'ADD_ITEM', item: newItem });
    setNewItem({ name: '', quantity: 1, price: '', recommended: false, onSale: false });    // reset input fields
  }

  const handleItemDelete = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', index});
  }

  const handleToggle = (field: 'recommended' | 'onSale', index?: number) => {
    if (index !== undefined) {
      dispatch({
        type: 'UPDATE_ITEM',
        index,
        field,
        value: !items[index][field],
      })
    } else {
      setNewItem({...newItem, [field]: !newItem[field]});
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    
    try {
      const isoDate = new Date(`${dateOfPurchase}T00:00:00.000Z`).toISOString();

      let imageUrls: string[] = [];

      if (images.length > 0) {
        imageUrls = await uploadImages(images);
      }
      
      const formData: HaulFormData = {
        dateOfPurchase: isoDate,
        storeName,
        items: items.map((item) => ({
          name: item.name,
          quantity: Number(item.quantity),
          price: item.price,
          recommended: item.recommended,
          onSale: item.onSale,
        })),
        notes,
        images: imageUrls,
      }

      const response = await createHaul(formData);
      setHauls([response.haul, ...hauls]);
      navigate(`/${user.username}/${response.haul.slug}`);
    } catch (err: any) {
      console.error(err);
      if (err.errors) {
        dispatch({ type: 'SET_ERRORS', errors: err.errors });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start mb-4">
        <Link to='/' className="flex space-x-2 p-2 px-4 rounded-lg hover:bg-stone-200">
          <img src="/icons/arrow-left.svg" alt="back" className="w-5" />
          <p className="font-medium text-lg">Back</p>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 flex flex-col min-w-3xl mx-auto">
        <h2 className="font-semibold text-xl text-center mb-8">New Haul</h2>
        {errors.length > 0 && (
          <div>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-start gap-20">
          <div className="flex flex-col justify-center">
            <label htmlFor="dateOfPurchase">Date of Purchase</label>
            <input
              type="date"
              className="border-2 border-stone-300 rounded-lg p-2 my-2 mb-8 text-lg"
              name="dateOfPurchase"
              value={dateOfPurchase}
              onChange={handleChange}
              required
            />

            <label htmlFor="storeName">Store</label>
            <input
              type="text"
              className="border-2 border-stone-300 rounded-lg p-2 my-2 text-lg"
              name="storeName"
              value={storeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="notes">Notes <i>(optional)</i></label>
            <textarea
              className="border-2 border-stone-300 rounded-lg p-2 my-2 text-lg"
              name="notes"
              cols={30} 
              rows={5} 
              value={notes} 
              onChange={handleChange}>
            </textarea>
          </div>
        </div>
        
        <div className="my-4">
          <h3>Items</h3>
          {/* list of items */}
          {items.map((item, index) => (
            <ItemInput
              key={index}
              item={item}
              index={index}
              onChange={handleItemChange}
              onToggle={handleToggle}
              onDelete={handleItemDelete}
            />
          ))}
          {/* add new item */}
          <ItemInput
            item={newItem}
            onChange={handleItemChange}
            onToggle={handleToggle}
            onAdd={handleItemAdd}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="images">Images <i>(optional)</i></label>
          <input type="file" className="w-fit bg-stone-200 hover:bg-stone-300 rounded-lg p-2 my-2 cursor-pointer" name="images" accept="image/*" onChange={handleFileChange} multiple />
        </div>
        
        <button
          type="submit" 
          className="w-full bg-cyan-500 hover:bg-cyan-400 rounded-full p-3 mt-5 text-white font-semibold"
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default NewHaulForm;