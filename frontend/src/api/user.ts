import { User } from "../types/user";

interface ApiResponse {
  user: User;
}

export const getUser = async (): Promise<ApiResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${apiUrl}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  const { user }: ApiResponse = await response.json();
  return { user };
};


export const getUserByUsername = async (username: string): Promise<ApiResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  let headers = {};
  
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  } else {
    headers = {
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch(`${apiUrl}/api/users/${username}`, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch user');
  }

  return response.json();
}

export const editUser = async (updatedUser: User): Promise<ApiResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${apiUrl}/api/users/${updatedUser.username}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to edit user data');
  }
  
  const { user }: ApiResponse = await response.json();
  return { user };
};