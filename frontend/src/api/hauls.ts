const apiUrl = import.meta.env.VITE_API_URL;
import { HaulFormData } from "../types/haul";

export const getHauls = async (page = 1, limit = 5) => {
  const response = await fetch(
    `${apiUrl}/api/hauls?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
};

export const getHaulByUrl = async (username: string, slug: string) => {
  const response = await fetch(
    `${apiUrl}/api/hauls/${username}/${slug}`
  )

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
}

export const createHaul = async (formData: HaulFormData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('token is missing');
  const response = await fetch(
    `${apiUrl}/api/hauls`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
};

export const updateHaul = async (username: string, slug: string, formData: HaulFormData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${apiUrl}/api/hauls/${username}/${slug}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
  return response.json();
};

export const deleteHaul = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${apiUrl}/api/hauls/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
  return response.json();
};
