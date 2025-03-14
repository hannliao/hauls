import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router';

const Header = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user, loading } = userContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="w-full flex justify-between items-center py-5">
      <Link to="/">
        <h1 className="font-bold text-3xl p-2 hover:text-lime-600">
          hauls
        </h1>
      </Link>
      <div>
        {user ? (
          <Link to={`${user.username}`}>
            <img
              src="/icons/person-circle.svg"
              alt="dashboard"
              className="w-12"
            />
          </Link>
        ) : (
          <Link to="/login">
            <img
              src="/icons/person-circle.svg"
              alt="dashboard"
              className="w-12"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
