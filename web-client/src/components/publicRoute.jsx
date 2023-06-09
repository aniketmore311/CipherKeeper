import useAuthStore from "../stores/authStore";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PublicRoute({ children, failureRedirect }) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to={failureRedirect} />;
  } else {
    return <>{children}</>;
  }
}

export default PublicRoute;
