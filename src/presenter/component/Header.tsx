import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { authMiddleware } from "../redux/middleware/AuthMiddleware";
import { AppDispatch, RootState } from "../redux/store";

export default function Header(): JSX.Element {
  const username = useSelector((state: RootState) => state.user.user?.username);
  const name = useSelector((state: RootState) => state.user.profile?.name);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(authMiddleware.logout()).then(() => {
      navigate("/login");
    });
  };

  if (
    ["/login", "/register"].includes(location.pathname) ||
    location.pathname.match("/test") ||
    location.pathname.match("/result")
  ) {
    return <div></div>;
  } else {
    return (
      <div className="flex justify-between py-5">
        <button
          onClick={() => navigate("/")}
          disabled={location.pathname === "/test"}
          className="grid grid-flow-col justify-items-center content-center gap-2"
        >
          <img className="w-8" src={logo} alt="logo" />
          <span className="text-gray-100 text-lg font-bold">Stroopy</span>
        </button>
        <div>
          <button>
            <span className="text-gray-100 font-bold">{name || username}</span>
          </button>
          <button onClick={() => navigate("/profile")}>
            <span className="ml-3 text-gray-100 font-bold">Profil</span>
          </button>
          <button onClick={handleLogout}>
            <span className="ml-3 text-red font-bold">Keluar</span>
          </button>
        </div>
      </div>
    );
  }
}
