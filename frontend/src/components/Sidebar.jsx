import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import {
  FaHome,
  FaBookmark,
  FaLock,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({
  mobile = false,
  open = false,
  onClose = () => {},
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    onClose();
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  const handleNavigation = () => {
    if (mobile) onClose();
  };

  return (
    <aside
      className={`${
        mobile
          ? `fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`
          : "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:h-screen lg:w-64"
      } flex flex-col justify-between bg-slate-900 p-6`}
    >
      <div>
        {/* Mobile Close Button */}
        {mobile && (
          <div className="mb-8 flex justify-end lg:hidden">
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-white hover:bg-slate-700"
            >
              <FaTimes size={22} />
            </button>
          </div>
        )}

        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <img src={logo} alt="MarkVault" className="w-11" />

          <h1 className="text-2xl font-bold text-white">
            Mark<span className="text-blue-500">Vault</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="/" className={linkClasses} onClick={handleNavigation}>
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={linkClasses}
            onClick={handleNavigation}
          >
            <FaBookmark />
            Bookmarks
          </NavLink>

          <NavLink
            to="/passwords"
            className={linkClasses}
            onClick={handleNavigation}
          >
            <FaLock />
            Passwords
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
