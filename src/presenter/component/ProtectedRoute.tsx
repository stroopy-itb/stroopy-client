import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthStatus } from "../../domain/model";
import { RootState } from "../redux/store";
import Loading from "./Loading";

export default function ProtectedRoute(props: {
  children: JSX.Element;
}): JSX.Element {
  const { children } = props;

  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const authLoading = useSelector((state: RootState) => state.auth.loading);

  if (authLoading) {
    return <Loading />;
  } else {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      return children;
    } else if (authStatus === AuthStatus.LOGGEDOUT) {
      return <Navigate to={"/login"} />;
    } else {
      return <div></div>;
    }
  }
}
