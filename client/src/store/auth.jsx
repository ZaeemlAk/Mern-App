import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const API = "https://mern-app-bymohd.onrender.com";

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const authorizationToken = token ? `Bearer ${token}` : "";

  // ======================
  // LOAD USER
  // ======================
  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API}/api/auth/user`, {
          headers: { Authorization: authorizationToken },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user); // 🔥 contains isAdmin
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [token]);

  // ======================
  // LOAD SERVICES
  // ======================
  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch(`${API}/api/service`); // ✅ FIXED
        const data = await res.json();
        if (res.ok) setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        API,
        storeTokenInLS,
        authorizationToken,
        user,
        isLoading,
        services,
        setServices,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
