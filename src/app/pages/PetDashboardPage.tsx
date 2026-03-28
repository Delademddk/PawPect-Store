import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

export default function PetDashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <NavBar />
      <p>I am the dashboard Page</p>
      <button className="p-2 bg-amber-400" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
