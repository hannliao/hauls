const apiUrl = import.meta.env.VITE_API_URL;
import { HaulFormData } from "../types/haul";

export const getHauls = async () => {
  const response = await fetch(
    `${apiUrl}/api/hauls`
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  return response.json();
};

export const createHaul = async (formData: HaulFormData) => {
  const token = localStorage.getItem('token');
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

export const updateHaul = async (id: string, formData: HaulFormData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${apiUrl}/api/hauls/${id}`,
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
