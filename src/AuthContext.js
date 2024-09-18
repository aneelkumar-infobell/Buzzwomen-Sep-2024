import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [apikey, setApiKey] = useState(Cookies.get('token') || null);

  return (
    <AuthContext.Provider value={{ apikey, setApiKey }}>
         {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
