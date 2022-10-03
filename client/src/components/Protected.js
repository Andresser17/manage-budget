import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default Protected;
