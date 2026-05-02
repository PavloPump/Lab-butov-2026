import { useState, useEffect } from 'react';
import { User } from '../services/mockData';
import { dataService, ApiResponse } from '../services/dataService';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Проверка авторизации при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    }
  }, []);

  // Регистрация
  const register = async (userData: Omit<User, 'id'>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response: ApiResponse<User> = await dataService.createUser(userData);
    
    if (response.state === 'success' && response.data) {
      setAuthState({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return { success: true, user: response.data };
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка регистрации'
      }));
      return { success: false, error: response.error };
    }
  };

  // Вход
  const login = async (email: string, _password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Имитация проверки пароля (в реальном приложении - проверка на backend)
    const response: ApiResponse<User[]> = await dataService.getUsers();
    
    if (response.state === 'success' && response.data) {
      const user = response.data.find(u => u.email === email);
      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Пользователь не найден'
        }));
        return { success: false, error: 'Пользователь не найден' };
      }
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Ошибка входа'
      }));
      return { success: false, error: response.error };
    }
  };

  // Выход
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    localStorage.removeItem('currentUser');
  };

  return {
    ...authState,
    register,
    login,
    logout
  };
};
