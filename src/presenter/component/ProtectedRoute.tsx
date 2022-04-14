import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authMiddleware } from "../redux/middleware";
import { AppDispatch, RootState } from "../redux/store";

export default function ProtectedRoute(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const userProfile = useSelector((state: RootState) => state.user.profile);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const [prevPath] = useState(location.pathname);
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authMiddleware.reauth()).then(() => {
        navigate(prevPath);
      });
    }
    if (isAuthenticated && user && !userProfile) {
      toast.warning("Silahkan lengkapi data profil anda!");
      navigate("profile");
    }
  }, [isAuthenticated, user, userProfile, prevPath]);

  if (authLoading) {
    return <h1 className="text-5xl font-bold text-white text center">Loading</h1>
  } else {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}
