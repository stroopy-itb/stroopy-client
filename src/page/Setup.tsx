import { useNavigate } from "react-router-dom";

export default function Setup(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-center">
      <button
        className="w-64 button button-nav hover:button-hover"
        onClick={() => navigate("/test")}
      >
        START
      </button>
    </div>
  );
}
