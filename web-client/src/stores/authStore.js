import { create } from "zustand";
import jwtDecode from "jwt-decode";

const useAuthStore = create((set) => ({
  user: initUser(),
  processAccessToken: (accessToken) => {
    localStorage.setItem("access_token", accessToken);
    const decodedData = jwtDecode(accessToken);
    set({ user: decodedData });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: undefined });
  },
}));

// Check local storage for 'access_token' key and initialize the user property accordingly
function initUser() {
  const storedAccessToken = localStorage.getItem("access_token");
  if (storedAccessToken) {
    const decodedToken = jwtDecode(storedAccessToken);
    return decodedToken;
  } else {
    return undefined;
  }
}

export default useAuthStore;
