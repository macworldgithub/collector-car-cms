import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left: hamburger menu (mobile only) */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1 text-center md:text-left">
          Collector Car Management
        </h1>

        {/* Right: user info */}
        <div className="hidden sm:flex items-center space-x-4">
          <span className="text-gray-700">
            Welcome, {user?.name || user?.email}
          </span>
        </div>
      </div>
    </header>
  );
}
