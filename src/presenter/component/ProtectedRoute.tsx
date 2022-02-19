import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";


export default function ProtectedRoute(props: {children: JSX.Element}): JSX.Element {
  const { children } = props;

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return children;
  } else {
    return ( <Navigate to={"/login"}/> );
  }
}