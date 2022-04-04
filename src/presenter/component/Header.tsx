import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { authMiddleware } from "../redux/middleware/AuthMiddleware";
import { AppDispatch, RootState } from "../redux/store";

export default function Header(): JSX.Element {
  const username = useSelector((state: RootState) => state.user.user?.username);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    await dispatch(authMiddleware.logout()).then(() => {
      navigate("/login");
    });
  };

  if (location.pathname !== "/login" && location.pathname !== "/register") {
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
          <div>
            <button>
              <span className="text-white font-bold">{username}</span>
            </button>
            <button onClick={handleLogout}>
              <span className="ml-3 text-red font-bold">Keluar</span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
}
