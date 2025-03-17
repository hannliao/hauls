import App from './components/App'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import NewHaulForm from './components/NewHaulForm';
import Profile from './components/Profile';
import EditProfileForm from './components/EditProfileForm'
import HaulDetails from './components/HaulDetails';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />},
      { path: 'signup', element: <SignUp />},
      { path: 'login', element: <Login />},
      { path: 'new', element: <NewHaulForm />},
      { path: ':username/:slug', element: <HaulDetails />},
      { path: ':username/edit', element: <EditProfileForm />},
      { path: ':username', element: <Profile />},
    ],
  },
];

export default routes;