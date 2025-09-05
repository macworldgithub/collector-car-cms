import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/cars/create', icon: Plus, label: 'Add Car' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <Car className="h-8 w-8 text-blue-400" />
        <span className="text-2xl font-extrabold">Car Depot</span>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 border-r-4 border-blue-400' : ''
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-2">
        <button
          onClick={logout}
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}