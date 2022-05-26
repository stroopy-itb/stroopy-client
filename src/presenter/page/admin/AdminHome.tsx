import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-center">
      <button
        className="w-64 button button-xl button-neutral-outline"
        onClick={() => navigate("/admin/research-token")}
      >
        Kelola Token
      </button>
      <button
        className="w-64 button button-xl button-neutral-outline"
        onClick={() => navigate("/admin/research")}
      >
        Penelitian
      </button>
    </div>
  );
}
