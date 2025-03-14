const apiUrl = import.meta.env.VITE_API_URL;

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await fetch(`${apiUrl}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const data = await response.json();
  return data.filePaths;
}