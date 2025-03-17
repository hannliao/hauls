import { getUser } from "./user";

interface LoginResponse {
  token: string;
  message: string;
}

interface ErrorResponse {
  message: string;
  errors?: { msg: string }[];
}

const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw data as ErrorResponse;
  }
  localStorage.setItem('token', data.token);

  const userResponse = await getUser();

  return { ...data, user: userResponse.user };
};

export const createUser = async (
  firstName: string,
  lastName: string,
  username: string, 
  password: string, 
  confirmPwd: string
): Promise<LoginResponse> => {
  const response = await fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, username, password, confirmPwd }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  return response.json();
};
