import { createContext, useContext, useState } from 'react';
import API from '../api/api';

const AuthContext = createContext(null);

// Get initial auth state from localStorage
const getInitialAuthState = () => {
  const storedAuth = localStorage.getItem('rechargex_auth');
  if (storedAuth) {
    try {
      const authData = JSON.parse(storedAuth);
      return {
        user: authData.user,
        token: authData.token,
        isLoggedIn: true,
        userRole: authData.user.role,
      };
    } catch {
      localStorage.removeItem('rechargex_auth');
    }
  }
  return { user: null, token: null, isLoggedIn: false, userRole: null };
};

export const AuthProvider = ({ children }) => {
  const initialState = getInitialAuthState();
  const [user, setUser] = useState(initialState.user);
  const [token, setToken] = useState(initialState.token);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [userRole, setUserRole] = useState(initialState.userRole);
  const loading = false;

  // Save auth state to localStorage (including JWT token)
  const saveAuthToStorage = (userData, jwtToken) => {
    localStorage.setItem('rechargex_auth', JSON.stringify({ user: userData, token: jwtToken }));
  };

  // User login - authenticate against MongoDB with JWT
  const loginUser = async (email, password) => {
    try {
      const response = await API.post('/users/login', { email, password });
      const data = response.data;
      
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      setUserRole(data.user.role?.toLowerCase() || 'user');
      saveAuthToStorage(data.user, data.token);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
    }
  };

  // Admin login - authenticate against MongoDB with admin role check
  const loginAdmin = async (email, password) => {
    try {
      const response = await API.post('/users/login', { email, password });
      const data = response.data;
      
      if (data.user.role !== 'ADMIN') {
        return { success: false, message: 'Access denied. Admin only.' };
      }
      
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      setUserRole('admin');
      saveAuthToStorage(data.user, data.token);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
    }
  };

  // Signup - create user in MongoDB with JWT
  const signup = async (userData) => {
    try {
      const response = await API.post('/users/register', { ...userData, role: 'USER' });
      const data = response.data;
      
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      setUserRole('user');
      saveAuthToStorage(data.user, data.token);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Signup failed' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('rechargex_auth');
  };

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      const response = await API.put(`/users/${user._id}`, updatedData);
      const data = response.data;
      
      setUser(data);
      saveAuthToStorage(data, token);
      return { success: true, user: data };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Update failed' };
    }
  };

  const value = {
    user,
    token,
    isLoggedIn,
    userRole,
    loading,
    loginUser,
    loginAdmin,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
