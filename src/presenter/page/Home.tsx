import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResearcherHome } from ".";
import { UserRole } from "../../domain/model/UserRole";
import { RootState } from "../redux/store";
import AdminHome from "./admin/AdminHome";

export default function Home(): JSX.Element {
  const userRole = useSelector((state: RootState) => state.user.user?.role);

  const navigate = useNavigate();

  switch (userRole) {
    case UserRole.Admin:
      return <AdminHome />;
    case UserRole.Researcher:
      return <ResearcherHome />;
    default:
      return (
        <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-center">
          <button
            className="w-64 button button-nav hover:button-hover"
            onClick={() => navigate("/setup")}
          >
            Mulai Tes!
          </button>
          <button
            className="w-64 button button-nav hover:button-hover"
            onClick={() => navigate("/history")}
          >
            Riwayat
          </button>
        </div>
      );
  }
}
