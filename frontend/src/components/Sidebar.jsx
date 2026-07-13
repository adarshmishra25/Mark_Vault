import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBookmark, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-10">
          Mark<span className="text-blue-500">Vault</span>
        </h1>

        <nav className="space-y-2">
          <NavLink to="/" className={linkClasses}>
            <FaHome size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/bookmarks" className={linkClasses}>
            <FaBookmark size={18} />
            <span>Bookmarks</span>
          </NavLink>

          <NavLink to="/passwords" className={linkClasses}>
            <FaLock size={18} />
            <span>Passwords</span>
          </NavLink>
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
