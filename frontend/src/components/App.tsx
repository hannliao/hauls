import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="flex flex-col flex-1 max-w-3xl w-4/5 items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
