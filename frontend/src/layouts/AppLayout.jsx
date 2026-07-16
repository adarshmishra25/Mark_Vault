import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      {/* Mobile Navbar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 transition hover:bg-gray-100"
        >
          <FaBars size={22} />
        </button>

        <h1 className="text-xl font-bold">
          Mark<span className="text-blue-600">Vault</span>
        </h1>

        {/* Spacer */}
        <div className="w-10" />
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar
            mobile
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}