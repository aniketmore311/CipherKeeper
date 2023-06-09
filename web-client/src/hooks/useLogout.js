import useAuthStore from "../stores/authStore";

function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  return {
    logout: () => {
      logout();
    },
  };
}

export default useLogout;
