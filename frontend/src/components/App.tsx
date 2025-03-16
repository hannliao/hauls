import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="bg-stone-100 min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex-grow w-full flex justify-center items-center p-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
