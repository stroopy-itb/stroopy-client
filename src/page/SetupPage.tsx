import { useNavigate } from "react-router-dom"

export default function SetupPage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/test")}>START</button>
        </div>
    )
}