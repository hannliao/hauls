import { ItemInputProps } from "../types/item";

const ItemInput: React.FC<ItemInputProps> = ({
  item,
  index,
  onChange,
  onToggle,
  onAdd,
  onDelete
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();   // prevent form submission
      if (onAdd) {
        onAdd();
      }
    }
  }
  
  return (
    <div className="flex items-center">
      <button 
        type="button" 
        className={`border-1 hover:text-lime-600 hover:border-lime-600 rounded-full p-1 px-4 m-2 text-sm
          ${item.recommended 
          ? 'text-lime-600 border-lime-600'
          : 'text-stone-400 border-stone-400'}`}
        name="recommended"
        onClick={() => onToggle('recommended', index)}
      >
        recommended
      </button>

      <button
        type="button"
        className={`border-1 hover:text-amber-400 hover:border-amber-400 rounded-full p-1 px-4 m-2 text-sm
        ${item.onSale
          ? 'text-amber-400 border-amber-400'
          : 'text-stone-400 border-stone-400'}`}
        name="onSale"
        onClick={() => onToggle('onSale', index)}
      >
        on sale
      </button>

      <input
        type="text" 
        className="flex-1 p-2 m-2 focus:outline-none"
        name="name"
        value={item.name}
        onChange={(e) => onChange(e, index)}
        onKeyDown={handleKeyDown}
        placeholder="new item..."
      />

      <div className="text-stone-400">
        <label htmlFor="quantity">qty</label>
        <input
          type="number"
          className="w-12 p-1 m-1 text-lg focus:outline-none"
          name="quantity"
          min="1"
          value={item.quantity}
          onChange={(e) => onChange(e, index)} />
      </div>

      <div className="text-stone-400">
        <label htmlFor="price" className="text-lg">$</label>
        <input
          type="text"
          className="w-16 text-lg focus:outline-none"
          name="price"
          maxLength={5}
          inputMode="decimal"
          pattern="\d+(\.\d{1,2})?$"
          value={item.price}
          onChange={(e) => onChange(e, index)}
        />
      </div>

      {onAdd && (
        <button type="button"
          className="p-2 m-2"
          onClick={onAdd}
        >
          <img src="icons/corner-down-left.svg" alt="enter" />
        </button>
      )}

      {onDelete && index !== undefined && (
        <button type="button"
          className="w-10 p-2 m-2"
          onClick={() => onDelete(index)}
        >
          <img src="icons/trash-outline.svg" alt="delete" />
        </button>
      )}
    </div>
  )
}

export default ItemInput;