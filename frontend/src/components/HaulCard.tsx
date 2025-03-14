import { Link } from "react-router";
import { HaulCardProps } from "../types/haul";

const HaulCard: React.FC<HaulCardProps> = ({ dateOfPurchase, storeName, slug, userId, items, notes}) => {
  return (
    <div>
      <Link to={`${slug}`}>
        <h4>{storeName}</h4>
        <p>@{userId}</p>
        <p>{dateOfPurchase}</p>
      </ Link>
    </div>
  )
}

export default HaulCard;