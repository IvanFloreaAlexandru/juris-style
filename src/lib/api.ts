// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Get JWT token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

// Save JWT token to localStorage
const saveToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

// Remove JWT token from localStorage
const removeToken = (): void => {
  localStorage.removeItem('jwt_token');
};

// Login and get JWT token
export const loginAPI = async (username: string, password: string): Promise<{ access_token: string; token_type: string }> => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  saveToken(data.access_token);
  return data;
};

// Create article
export const createArticleAPI = async (articleData: {
  title: string;
  slug: string;
  category: string;
  tags: string;
  extras?: string;
  cover_image?: string;
  content: string;
}): Promise<{ status: string; file: string; url: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new URLSearchParams();
  formData.append('title', articleData.title);
  formData.append('slug', articleData.slug);
  formData.append('category', articleData.category);
  formData.append('tags', articleData.tags);
  if (articleData.extras) formData.append('extras', articleData.extras);
  if (articleData.cover_image) formData.append('cover_image', articleData.cover_image);
  formData.append('content', articleData.content);

  const response = await fetch(`${API_BASE_URL}/create-article/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      throw new Error('Authentication expired. Please login again.');
    }
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create article');
  }

  return await response.json();
};

export { getToken, saveToken, removeToken };
