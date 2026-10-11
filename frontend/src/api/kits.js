
const RAW_API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_URL = RAW_API_URL.replace(/\/+$/, '');

export const getKitImageUrl = (image) => {
  if (!image) return '';

  if (
    image.startsWith('data:') ||
    /^https?:\/\//i.test(image)
  ) {
    return image;
  }

  const apiOrigin = API_URL.replace(/\/api\/?$/, '');

  return `${apiOrigin}/${image.replace(/^\/+/, '')}`;
};

const API_BASE = API_URL.endsWith('/api')
  ? API_URL
  : `${API_URL}/api`;

const getHeaders = () => {
  const token = localStorage.getItem('ignitron_admin_token');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Headers for FormData requests.
// Do not set Content-Type manually for FormData;
// fetch will automatically add the multipart boundary.
const getFormDataHeaders = () => {
  const token = localStorage.getItem('ignitron_admin_token');

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper for handling API responses
const handleResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

// Get all public kits
export const getPublicKits = async () => {
  const response = await fetch(`${API_BASE}/kits`, {
    method: 'GET',
    credentials: 'include',
  });

  return handleResponse(response, 'Failed to fetch kits');
};

// Get a public kit by slug
export const getKitBySlug = async (slug) => {
  const response = await fetch(
    `${API_BASE}/kits/slug/${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  return handleResponse(response, 'Failed to fetch kit');
};

// Get all kits for admin
export const getAdminKits = async () => {
  const response = await fetch(`${API_BASE}/kits/admin`, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
  });

  return handleResponse(response, 'Failed to fetch admin kits');
};

// Get a kit by ID
export const getKitById = async (id) => {
  const response = await fetch(
    `${API_BASE}/kits/${encodeURIComponent(id)}`,
    {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    }
  );

  return handleResponse(response, 'Failed to fetch kit');
};

// Create a kit
// Supports both JSON objects and FormData
export const createKit = async (kitData) => {
  const isFormData = kitData instanceof FormData;

  const response = await fetch(`${API_BASE}/kits`, {
    method: 'POST',
    headers: isFormData ? getFormDataHeaders() : getHeaders(),
    credentials: 'include',
    body: isFormData ? kitData : JSON.stringify(kitData),
  });

  return handleResponse(response, 'Failed to create kit');
};

// Update a kit
// Supports both JSON objects and FormData
export const updateKit = async (id, kitData) => {
  const isFormData = kitData instanceof FormData;

  const response = await fetch(
    `${API_BASE}/kits/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: isFormData ? getFormDataHeaders() : getHeaders(),
      credentials: 'include',
      body: isFormData ? kitData : JSON.stringify(kitData),
    }
  );

  return handleResponse(response, 'Failed to update kit');
};

// Delete a kit
export const deleteKit = async (id) => {
  const response = await fetch(
    `${API_BASE}/kits/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    }
  );

  return handleResponse(response, 'Failed to delete kit');
};