import { useState } from "react";
import { UserRound } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);

  //   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    // navigate("/login", { replace: true });
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer focus:outline-none "
      >
        <UserRound className="h-7 w-7 p-0.75 rounded-full border-2 border-gray-300 hover:border-blue-500 transition" />
      </button>
      {isOpen && (
        <div className="absolute right-5 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 z-50">
          <div className="py-1">
            <a
              href="#profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Your Profile
            </a>
            <a
              href="#settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <hr className="my-1 border-gray-200" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
