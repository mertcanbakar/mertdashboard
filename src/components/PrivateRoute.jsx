/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.userSlice.user);

  const location = useLocation();
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }

  return children;
}
