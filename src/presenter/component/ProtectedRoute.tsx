import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthStatus } from "../../domain/model";
import { authMiddleware } from "../redux/middleware";
import { AppDispatch, RootState } from "../redux/store";

export default function ProtectedRoute(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  const authStatus = useSelector(
    (state: RootState) => state.auth.authStatus
  );
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const userProfile = useSelector((state: RootState) => state.user.profile);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const [prevPath] = useState(location.pathname);
  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) {
      dispatch(authMiddleware.reauth()).then(() => {
        navigate(prevPath);
      });
    }
    if (authStatus === AuthStatus.AUTHENTICATED && user && !userProfile) {
      toast.warning("Silahkan lengkapi data profil anda!");
      navigate("/profile");
    }
  }, [authStatus, user, userProfile, prevPath]);

  if (authLoading) {
    return <h1 className="w-screen flex-grow text-5xl font-bold text-white text-center">Loading</h1>
  } else {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}
