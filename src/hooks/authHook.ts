import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { RootState } from "../store";

export const useAuthenticated = (): boolean => {
  const token = useSelector((state: RootState) => state?.userReducer?.token);

  const dispatch = useDispatch();

  if (token) {
    const decodedToken = jwtDecode(token);

    // let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(timeZone);

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken?.exp;

    if (expirationTime && currentTime < expirationTime) {
      return true;
    } else {
      dispatch(logout());
      return false;
    }
  } else {
    return false;
  }
};

export const useAuthroization = (roles: String[]) => {
  const userRoles = useSelector(
    (state: RootState) => state?.userReducer?.roles
  );

  if (!userRoles || !roles) {
    return false;
  }

  const filteredRoles = userRoles.filter((role) => roles.includes(role));

  return filteredRoles.length > 0;
};
