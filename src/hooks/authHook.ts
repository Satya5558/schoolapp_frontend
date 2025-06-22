import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { RootState } from "../store";

export const useAuthenticated = (): boolean => {
  const token = useSelector((state: RootState) => state?.userReducer?.token);
  const dispatch = useDispatch();

  if (!token) {
    return false;
  }

  const decodedToken = useMemo(() => {
    try {
      return jwtDecode<{ exp?: number }>(token);
    } catch (error) {
      console.error("Invalid token", error);
      dispatch(logout());
      return null;
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!decodedToken) return;
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.warn("Token has expired");
      dispatch(logout());
    }
  }, [decodedToken, dispatch]);

  if (!decodedToken) {
    return false;
  }

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return false;
  }

  return true;
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
