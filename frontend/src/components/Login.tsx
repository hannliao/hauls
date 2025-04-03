import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../api/auth';
import { User } from '../types/user';

interface Error {
  msg: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user?: User;
  redirect?: string;
}

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Error[]>([]);

  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext is not available");
  }
  const { setToken, setUser } = context;
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response: LoginResponse = await loginUser(username, password);
      console.log(response.message);
      if (response.user && response.token) {
        setToken(response.token);
        setUser(response.user);
      }
      if (response.redirect) {
        navigate(response.redirect);
      }
    } catch (err: any) {
      console.error(err.message);
      if (err.errors) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <div className="place-self-center w-full flex-1 flex flex-col items-center justify-center">
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="text-red-600 my-2" data-testid="error-message">
              {error.msg}
            </p>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col bg-white rounded-lg p-6 mb-2"
      >
        <h1 className="text-center text-xl mb-4">Log In</h1>
        <label htmlFor="username">Username</label>
        <input
          className="border border-stone-300 rounded-lg p-2 my-2"
          id="username"
          name="username"
          type="text"
          maxLength={50}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="border border-stone-300 rounded-lg p-2 my-2"
          id="password"
          name="password"
          type="password"
          maxLength={50}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-400 rounded-full p-2 mt-5 text-white">
          Log In
        </button>
      </form>
      <span>
        Don't have an account yet?{' '}
        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-400 underline"
        >
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
