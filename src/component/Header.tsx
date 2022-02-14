import React from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import logo from "../logo.svg";

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between py-5">
      <button
        onClick={() => navigate("/")}
        disabled={location.pathname === "/test"}
        className="grid grid-flow-col justify-items-center content-center gap-2"
      >
        <img className="w-8" src={logo} alt="logo" />
        <span className="text-white text-lg font-bold">Stroopy</span>
      </button>
      {location.pathname !== "/test" ? (
        <button>
          <span className="text-white font-bold">Account</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
