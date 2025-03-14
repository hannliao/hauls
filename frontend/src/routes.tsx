import App from './components/App'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import NewHaulForm from './components/NewHaulForm';
import Dashboard from './components/Dashboard';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />},
      { path: 'new', element: <NewHaulForm />},
      { path: 'signup', element: <SignUp />},
      { path: 'login', element: <Login />},
      { path: ':username', element: <Dashboard />},
    ],
  },
];

export default routes;