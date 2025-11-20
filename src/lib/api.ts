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

// Get articles with pagination
export const getArticlesAPI = async (page: number = 1, limit: number = 6, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append('search', search);

  const response = await fetch(`${API_BASE_URL}/articles?${params}`);
  if (!response.ok) throw new Error('Failed to fetch articles');
  return await response.json();
};

// Get single article
export const getArticleAPI = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`);
  if (!response.ok) throw new Error('Failed to fetch article');
  return await response.json();
};

// Create article
export const createArticleAPI = async (articleData: {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt?: string;
  coverImage?: string;
  content: string;
  status?: string;
}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
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

// Update article
export const updateArticleAPI = async (id: number, updates: Partial<any>) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const formData = new URLSearchParams();
  if (updates.title) formData.append('title', updates.title);
  if (updates.category) formData.append('category', updates.category);
  if (updates.content) formData.append('content', updates.content);

  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
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
    throw new Error('Failed to update article');
  }

  return await response.json();
};

// Delete article
export const deleteArticleAPI = async (id: number) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Failed to delete article');
  }

  return await response.json();
};

export { getToken, saveToken, removeToken };
