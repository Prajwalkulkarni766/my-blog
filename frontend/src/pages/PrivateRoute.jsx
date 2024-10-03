import { useSelector } from "react-redux";
import UnauthorizedPage from "./UnauthorizedPage";

const PrivateRoute = ({ children }) => {
  const tokenFromStore = useSelector((state) => state.token.token);
  const tokenFromLocalStorage = localStorage.getItem("access_token");

  if (!tokenFromStore && !tokenFromLocalStorage) {
    return <UnauthorizedPage />;
  }

  return children;
};

export default PrivateRoute;
