import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('ignitron_admin_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('ignitron_admin_token', data.token);
    const user = { _id: data._id, name: data.name, email: data.email, role: data.role };
    localStorage.setItem('ignitron_admin_user', JSON.stringify(user));
    setAdmin(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('ignitron_admin_token');
    localStorage.removeItem('ignitron_admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
