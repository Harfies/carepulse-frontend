
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

// Automatically log out after 15 minutes without activity.
const INACTIVITY_LIMIT = 15 * 60 * 1000;

// Only restore a user if a token also exists in this tab.
function readUser() {
  try {
    const token = sessionStorage.getItem("carepulse_token");
    const savedUser = sessionStorage.getItem("carepulse_user");

    if (!token || !savedUser) return null;

    return JSON.parse(savedUser);
  } catch {
    sessionStorage.removeItem("carepulse_token");
    sessionStorage.removeItem("carepulse_user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [loading, setLoading] = useState(false);

  // Handle login.
  async function login(email, password) {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("carepulse_token", data.token);
      sessionStorage.setItem(
        "carepulse_user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return data.user;
    } finally {
      setLoading(false);
    }
  }

  // Handle logout.
  function logout() {
    sessionStorage.removeItem("carepulse_token");
    sessionStorage.removeItem("carepulse_user");
    setUser(null);
  }

  // Automatic logout after inactivity.
  useEffect(() => {
    if (!user) return;

    let inactivityTimer;

    function logoutForInactivity() {
      sessionStorage.removeItem("carepulse_token");
      sessionStorage.removeItem("carepulse_user");
      setUser(null);
      window.location.replace("/login?reason=inactive");
    }

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(
        logoutForInactivity,
        INACTIVITY_LIMIT
      );
    }

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, {
        passive: true,
      });
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}
