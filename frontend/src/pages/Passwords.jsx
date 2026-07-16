import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaSearch,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaEdit,
  FaTrash,
  FaLock,
  FaCheck,
} from "react-icons/fa";

export default function Passwords() {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const [search, setSearch] = useState("");

  const filteredPasswords = passwords.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  });

  const fetchPasswords = async () => {
    try {
      const res = await api.get("/passwords");
      setPasswords(res.data.passwords);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const clearForm = () => {
    setEditingId(null);
    setTitle("");
    setUsername("");
    setPassword("");
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setUsername(item.username);
    setPassword(item.password);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addPassword = async () => {
    if (!title.trim() || !username.trim() || !password.trim()) return;

    try {
      setLoading(true);

      await api.post("/passwords", {
        title,
        username,
        password,
      });

      clearForm();
      fetchPasswords();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (!title.trim() || !username.trim() || !password.trim()) return;

    try {
      setLoading(true);

      await api.put(`/passwords/${editingId}`, {
        title,
        username,
        password,
      });

      clearForm();
      fetchPasswords();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePassword = async (id) => {
    if (!window.confirm("Delete this password?")) return;

    try {
      await api.delete(`/passwords/${id}`);
      fetchPasswords();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyPassword = async (id, password) => {
    try {
      await navigator.clipboard.writeText(password);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };
  return (
  <div className="w-full max-w-full space-y-10 overflow-x-hidden">
    {/* Header */}
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Password Manager
      </h1>

      <p className="text-base text-gray-500 sm:text-lg">
        Securely store and manage all your passwords in one place.
      </p>
    </div>

    {/* Add / Edit Password */}
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {editingId ? "Edit Password" : "Add Password"}
          </h2>
        </div>

        {editingId && (
          <button
            onClick={clearForm}
            className="w-full rounded-xl border border-red-200 px-4 py-2 text-red-500 transition hover:bg-red-50 sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingId ? updatePassword() : addPassword();
        }}
        className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end"
      >
        <div className="w-full lg:flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-600">
            Website
          </label>

          <input
            type="text"
            placeholder="LeetCode"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full lg:flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-600">
            Username / Email
          </label>

          <input
            type="text"
            placeholder="username@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full lg:flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-600">
            Password
          </label>

          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-xl disabled:opacity-50 lg:w-auto"
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
            ? "Update"
            : "Add"}
        </button>
      </form>
    </div>

    {/* Search */}
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search passwords..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Password List */}
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Saved Passwords
        </h2>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {filteredPasswords.length} Saved
        </span>
      </div>

      {filteredPasswords.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <FaLock className="text-3xl text-blue-600" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-700">
            {passwords.length === 0
              ? "No passwords saved"
              : "No matching passwords"}
          </h3>

          <p className="mt-3 text-gray-500">
            {passwords.length === 0
              ? "Add your first password to get started."
              : "Try another search keyword."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPasswords.map((item) => (
            <div
              key={item._id}
              className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-md transition hover:shadow-xl"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                {/* Left */}
                <div className="flex min-w-0 flex-1 gap-4">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${item.title}&sz=64`}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-2xl bg-gray-100 p-2"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-2 break-all text-gray-500">
                      {item.username}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="break-all rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm tracking-wider text-gray-700">
                        {visiblePasswords[item._id]
                          ? item.password
                          : "••••••••••••"}
                      </span>

                      <button
                        onClick={() => togglePassword(item._id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                      >
                        {visiblePasswords[item._id] ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex justify-end gap-3 md:self-start">
                  <button
                    onClick={() => copyPassword(item._id, item.password)}
                    className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-600 hover:bg-green-500 hover:text-white"
                  >
                    {copiedId === item._id ? <FaCheck /> : <FaCopy />}
                  </button>

                  <button
                    onClick={() => startEditing(item)}
                    className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deletePassword(item._id)}
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    <FaTrash />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
