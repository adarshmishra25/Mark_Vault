import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-full bg-slate-900 text-white">

      <div className="flex items-center justify-between border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold text-white">
          Hello <span className="text-blue-500">User</span>
        </h1>

      </div>

      <div className="p-10">

        <h2 className="text-2xl font-semibold">
          Welcome 👋
        </h2>

        <p className="mt-2 text-slate-400">
          Authentication is working successfully.
        </p>

      </div>

    </div>
  );
}