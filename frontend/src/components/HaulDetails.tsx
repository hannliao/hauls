import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getHaulByUrl } from "../api/hauls"

const HaulDetails = () => {
  const { username, slug } = useParams();
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchHaul = async () => {
      try {
        if (!username || !slug) {
          setError('Haul not found.');
          return;
        }
        const haul = await getHaulByUrl(username, slug);
      } catch (err) {
        
      }
    }
  })
  return (
    <div>
      <h2>Haul Details</h2>
    </div>
  )
}

export default HaulDetails;