import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-green-400">
          MarkVault
        </h1>

        <p className="text-center text-slate-400">
          Your secure bookmark & password manager
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-green-500 py-3 font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-400 transition hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}