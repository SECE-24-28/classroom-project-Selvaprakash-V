import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock users for demo
const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'user@test.com', password: 'user123', phone: '9876543210', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com', password: 'jane123', phone: '9876543211', role: 'user' },
];

const MOCK_ADMIN = { id: 100, name: 'Admin', email: 'admin@rechargex.com', password: 'admin123', role: 'admin' };

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

  // User login - anyone can login with any email/password
  const loginUser = (email) => {
    // Create user data from provided email
    const userData = {
      id: Date.now(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      phone: '',
      role: 'user',
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    setUserRole('user');
    saveAuthToStorage(userData);
    return { success: true, user: userData };
  };

  // Admin login - anyone can login as admin
  const loginAdmin = (email) => {
    const adminData = {
      id: Date.now(),
      name: 'Admin',
      email: email,
      role: 'admin',
    };
    
    setUser(adminData);
    setIsLoggedIn(true);
    setUserRole('admin');
    saveAuthToStorage(adminData);
    return { success: true, user: adminData };
  };

  // Signup
  const signup = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('rechargex_users') || '[]');
    const allUsers = [...MOCK_USERS, ...storedUsers];
    
    // Check if email already exists
    if (allUsers.find((u) => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
    };

    storedUsers.push(newUser);
    localStorage.setItem('rechargex_users', JSON.stringify(storedUsers));

    // Auto login after signup
    const userDataWithoutPassword = { ...newUser, password: undefined };
    setUser(userDataWithoutPassword);
    setIsLoggedIn(true);
    setUserRole('user');
    saveAuthToStorage(userDataWithoutPassword);

    return { success: true, user: userDataWithoutPassword };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('rechargex_auth');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    saveAuthToStorage(updatedUser);

    // Update in stored users if not mock user
    const storedUsers = JSON.parse(localStorage.getItem('rechargex_users') || '[]');
    const userIndex = storedUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedData };
      localStorage.setItem('rechargex_users', JSON.stringify(storedUsers));
    }

    return { success: true, user: updatedUser };
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
