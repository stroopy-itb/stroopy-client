import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const navigate = useNavigate();

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