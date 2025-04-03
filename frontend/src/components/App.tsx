import { Outlet, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;
    const protectedPatterns = ['/new', '/edit'];
    const isProtectedRoute = protectedPatterns.some(pattern => currentPath.includes(pattern));

    if (!token && isProtectedRoute) {
      navigate('/login');
      return;
    }
    
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          if (isProtectedRoute) {
            navigate('/login');
          }     
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        if (isProtectedRoute) {
          navigate('/login');
        }
      }
    }
  }, [navigate]);

  return (
    <div className="bg-stone-100 min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex-grow w-full flex justify-center items-start p-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
