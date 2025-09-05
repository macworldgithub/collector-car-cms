import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Collector Car Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {user?.name || user?.email}</span>
        </div>
      </div>
    </header>
  );
}