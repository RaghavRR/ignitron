const RAW_API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_URL = RAW_API_URL.replace(/\/+$/, '');

const API_BASE = API_URL.endsWith('/api')
  ? API_URL
  : `${API_URL}/api`;

// ==========================================
// AUTH HEADERS
// ==========================================

const getHeaders = () => {
  const token = localStorage.getItem('ignitron_admin_token');

  return {
    'Content-Type': 'application/json',
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

// ==========================================
// PUBLIC
// ==========================================

export const getPublicKits = async () => {
  const response = await fetch(`${API_BASE}/kits`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch kits'
    );
  }

  return data;
};

export const getKitBySlug = async (slug) => {
  const response = await fetch(
    `${API_BASE}/kits/slug/${encodeURIComponent(slug)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Kit not found'
    );
  }

  return data;
};

// ==========================================
// ADMIN
// ==========================================

export const getAdminKits = async () => {
  const response = await fetch(
    `${API_BASE}/kits/admin`,
    {
      headers: getHeaders(),
      credentials: 'include',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to fetch kits'
    );
  }

  return data;
};

export const getKitById = async (id) => {
  const response = await fetch(
    `${API_BASE}/kits/${id}`,
    {
      headers: getHeaders(),
      credentials: 'include',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Kit not found'
    );
  }

  return data;
};

export const createKit = async (kitData) => {
  const response = await fetch(
    `${API_BASE}/kits`,
    {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(kitData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to create kit'
    );
  }

  return data;
};

export const updateKit = async (id, kitData) => {
  const response = await fetch(
    `${API_BASE}/kits/${id}`,
    {
      method: 'PUT',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify(kitData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to update kit'
    );
  }

  return data;
};

export const deleteKit = async (id) => {
  const response = await fetch(
    `${API_BASE}/kits/${id}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to delete kit'
    );
  }

  return data;
};