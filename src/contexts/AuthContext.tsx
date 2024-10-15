import React, { createContext, useContext, useState, useEffect } from 'react';
import { login } from '../services/auth';
import { useNotification } from './NotificationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id?: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { notify } = useNotification()

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const signIn = async (username: string, password: string) => {

    const { data } = await login({ username, password })
    if (data.token && data.user) {
      setUser(data.user)
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

    } else notify('error', data.message, 2000)

  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
