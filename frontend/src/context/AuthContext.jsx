import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional: to wait for fetch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me"); // get user from cookie
        setUser(data);
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};