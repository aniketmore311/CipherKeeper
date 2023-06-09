import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useLogout from "../hooks/useLogout";

function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  return (
    <div>
      <p>home</p>
      {user ? user.username : "not logged in"}{" "}
      {user && (
        <a
          className="btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            logout.logout();
          }}
        >
          logout
        </a>
      )}
      {!user && <Link to={"/login"}>Login</Link>}
    </div>
  );
}

export default Home;
