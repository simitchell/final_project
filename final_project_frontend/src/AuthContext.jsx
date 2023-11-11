import { createContext, useContext, useState, useEffect } from "react";
import "./index.css";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState(""); // Added username state
  const value = {
    isAuth,
    setIsAuth,
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      // Retrieve username from localStorage if it exists
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}







