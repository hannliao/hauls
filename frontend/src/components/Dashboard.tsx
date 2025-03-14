import { useContext } from 'react';
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../contexts/UserContext';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext) || {};    // fallback if user is null
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setUser?.(null);      // optional chaining
    console.log('Logged out');
    navigate('/login');
  };

  return (
    <div className="flex-1">
      <h2 className="font-semibold text-xl mb-8 text-left">Dashboard</h2>
      <div className="flex">
      <nav className="flex flex-col">
        <Link to="/" className="p-4 hover:bg-stone-200">Past Hauls</Link>
        <Link to="/" className="p-4 hover:bg-stone-200">Edit Profile</Link>
        <button onClick={handleLogout} className="p-2 underline underline-offset-2 hover:no-underline">Log out</button>
      </nav>
      <div className="p-5">
        <h3>Past Hauls or whatever title</h3>
      </div>
      </div>
      
    </div>
  )
}

export default Dashboard;