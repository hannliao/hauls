import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user, setUser } = userContext;
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setUser(null);
    setIsUserMenuOpen(false);
    console.log('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  return (
    <header className="sticky bg-white w-full flex justify-between items-center p-2 px-6">
      <Link to="/">
        <h1 className="font-bold text-3xl p-2 hover:text-amber-400">
          hauls
        </h1>
      </Link>
      <div>
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <img
              src="/icons/person-circle.svg"
              alt="profile"
              className="w-12 hover:cursor-pointer"
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className="absolute top-12 right-2 flex flex-col text-stone-600 rounded border-1 border-stone-200 shadow-sm bg-white">
                <Link
                  to={`${user.username}`}
                  className="p-2 px-6 hover:bg-amber-100 border-b-1 border-stone-200"
                  onClick={toggleUserMenu}
                >
                  @{user.username}
                </Link>
                <button onClick={handleLogout} className="p-2 px-6 hover:bg-amber-100">Log out</button>
            </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <img
              src="/icons/person-circle.svg"
              alt="profile"
              className="w-12"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
