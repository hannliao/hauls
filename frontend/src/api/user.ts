interface User {
  id: string;
  username: string;
}

interface ApiResponse {
  user: User;
}

export const getUser = async (): Promise<{user: User}> => {
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
  return { user: { id: user.id, username: user.username } };
};
