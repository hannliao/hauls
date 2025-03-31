import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUser } from '../api/auth';

interface SignUpResponse {
  message: string;
  redirect?: string;
  errors?: string[];
}

interface SignUpState {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPwd: string;
  errors: string[],
}

type FieldNames = 'firstName' | 'lastName' | 'username' | 'password' | 'confirmPwd';

type SignUpAction = 
  | { type: 'UPDATE_FIELD'; field: FieldNames; value: string }
  | { type: 'SET_ERRORS'; errors: string[] };

const initialState: SignUpState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPwd: '',
  errors: [],
}

const signUpReducer = (state: SignUpState, action: SignUpAction): SignUpState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {...state, [action.field]: action.value};
    case 'SET_ERRORS':
      return {...state, errors: action.errors};
    default:
      return state;
  }
}

const SignUp = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const { firstName, lastName, username, password, confirmPwd, errors} = state;

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response: SignUpResponse = await createUser(firstName, lastName, username, password, confirmPwd);
      console.log(response.message);
      if (response.redirect) {
        navigate(response.redirect);
      }
    } catch (err: any) {
      console.error(err.message);

      const errorMessages = err.errors
        ? err.errors.map((error: { msg: string }) => error.msg)
        : [err.message || 'An unexpected error occurred'];

      dispatch({ type: 'SET_ERRORS', errors: errorMessages });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name as FieldNames, value});
  };

  return (
    <div className="place-self-center flex-1 flex flex-col items-center justify-center">
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="text-red-600 my-2">
              {error}
            </p>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col bg-white rounded-lg p-6 mb-2"
      >
        <h1 className="text-center text-lg mb-4">Sign Up</h1>
        <label htmlFor="firstName">First Name*</label>
        <input
          className="border border-stone-300 rounded-lg p-2 mb-2"
          id="firstName"
          name="firstName"
          type="text"
          maxLength={50}
          value={firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name*</label>
        <input
          className="border border-stone-300 rounded-lg p-2 mb-2"
          id="lastName"
          name="lastName"
          type="text"
          maxLength={50}
          value={lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="username">Username*</label>
        <input
          className="border border-stone-300 rounded-lg p-2 mb-2"
          id="username"
          name="username"
          type="text"
          maxLength={50}
          value={username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          className="border border-stone-300 rounded-lg p-2 mb-2"
          id="password"
          name="password"
          type="password"
          maxLength={50}
          value={password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPwd">Confirm Password*</label>
        <input
          className="border border-stone-300 rounded-lg p-2 mb-2"
          id="confirmPwd"
          name="confirmPwd"
          type="password"
          maxLength={50}
          value={confirmPwd}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 hover:bg-blue-400 rounded-full p-2 mt-5 text-white">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-400 underline"
        >
          Log In
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
