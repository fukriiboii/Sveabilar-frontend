import { createContext, useState, type ReactNode } from 'react';
import { login as loginApi } from '../api/authApi';
import { saveAccessToken } from '../utils/authStorage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  setIsAuthenticated: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    const response = await loginApi(email, password);

    saveAccessToken(response.accessToken);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}