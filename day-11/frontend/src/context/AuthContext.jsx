import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:3000/users';

// Get initial auth state from localStorage
const getInitialAuthState = () => {
  const storedAuth = localStorage.getItem('rechargex_auth');
  if (storedAuth) {
    try {
      const authData = JSON.parse(storedAuth);
      return {
        user: authData.user,
        isLoggedIn: true,
        userRole: authData.user.role,
      };
    } catch {
      localStorage.removeItem('rechargex_auth');
    }
  }
  return { user: null, isLoggedIn: false, userRole: null };
};

export const AuthProvider = ({ children }) => {
  const initialState = getInitialAuthState();
  const [user, setUser] = useState(initialState.user);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [userRole, setUserRole] = useState(initialState.userRole);
  const loading = false;

  // Save auth state to localStorage
  const saveAuthToStorage = (userData) => {
    localStorage.setItem('rechargex_auth', JSON.stringify({ user: userData }));
  };

  // User login - authenticate against MongoDB
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      
      setUser(data.user);
      setIsLoggedIn(true);
      setUserRole(data.user.role?.toLowerCase() || 'user');
      saveAuthToStorage(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // Admin login - authenticate against MongoDB with admin role check
  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      
      if (data.user.role !== 'ADMIN') {
        return { success: false, message: 'Access denied. Admin only.' };
      }
      
      setUser(data.user);
      setIsLoggedIn(true);
      setUserRole('admin');
      saveAuthToStorage(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // Signup - create user in MongoDB
  const signup = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, role: 'USER' }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.error || 'Signup failed' };
      }
      
      // Auto login after signup
      const userWithoutPassword = { ...data.user };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      setUserRole('user');
      saveAuthToStorage(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('rechargex_auth');
  };

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.error || 'Update failed' };
      }
      
      setUser(data);
      saveAuthToStorage(data);
      return { success: true, user: data };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const value = {
    user,
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
