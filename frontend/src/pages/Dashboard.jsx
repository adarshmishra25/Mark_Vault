import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaLock, FaArrowRight } from "react-icons/fa";
import api from "../services/api";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchBookmarks();
    fetchPasswords();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/bookmarks");
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPasswords = async () => {
    try {
      const res = await api.get("/passwords");
      setPasswords(res.data.passwords);
    } catch (err) {
      console.error(err);
    }
  };

  const latestBookmark =
    bookmarks.length > 0 ? bookmarks[bookmarks.length - 1] : null;

  const latestPassword =
    passwords.length > 0 ? passwords[passwords.length - 1] : null;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 sm:p-8 lg:p-10 text-white shadow-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          Hello{" "}
          <span className="text-blue-100">
            {user?.name?.split(" ")[0] || "User"}
          </span>{" "}
          👋
        </h1>

        <p className="mt-3 max-w-2xl text-base sm:text-lg text-blue-100">
          Manage your bookmarks and passwords securely from one place.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Bookmark Card */}
        <div className="rounded-3xl border border-blue-100 bg-white p-6 sm:p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-100 p-3 sm:p-4">
              <FaBookmark className="text-2xl sm:text-3xl text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Bookmarks
              </h2>

              <p className="text-sm sm:text-base text-gray-500">
                Overview of your saved bookmarks
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-5xl sm:text-6xl font-extrabold text-blue-600">
              {bookmarks.length}
            </h3>

            <p className="mt-2 text-gray-500">Total Bookmarks</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Last Added
            </p>

            <p className="mt-2 truncate text-lg font-semibold text-gray-800">
              {latestBookmark?.title || "No bookmarks yet"}
            </p>
          </div>

          <Link
            to="/bookmarks"
            className="mt-8 flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Bookmarks
            <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Password Card */}
        <div className="rounded-3xl border border-green-100 bg-white p-6 sm:p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-green-100 p-3 sm:p-4">
              <FaLock className="text-2xl sm:text-3xl text-green-600" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Passwords
              </h2>

              <p className="text-sm sm:text-base text-gray-500">
                Overview of your saved passwords
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-5xl sm:text-6xl font-extrabold text-green-600">
              {passwords.length}
            </h3>

            <p className="mt-2 text-gray-500">Saved Passwords</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Last Added
            </p>

            <p className="mt-2 truncate text-lg font-semibold text-gray-800">
              {latestPassword?.title ||
                latestPassword?.website ||
                latestPassword?.site ||
                "No passwords yet"}
            </p>
          </div>

          <Link
            to="/passwords"
            className="mt-8 flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            View Passwords
            <FaArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
