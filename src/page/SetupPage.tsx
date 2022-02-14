import { useNavigate } from "react-router-dom";

export default function SetupPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="h-full grid grid-flow-row gap-5 justify-items-center content-center">
      <button
        className="button hover:button-hover"
        onClick={() => navigate("/test")}
      >
        START
      </button>
    </div>
  );
}
