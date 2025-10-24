// import React from "react";
// import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Car, Plus, LogOut, X, MessageSquare } from "lucide-react";
// import { useAuth } from "../../contexts/AuthContext";

// interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }

// export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
//   const { logout } = useAuth();

//   const navItems = [
//     { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { to: "/cars/create", icon: Plus, label: "Add Car" },
//     { to: "/testimonials", icon: MessageSquare, label: "Testimonials" },
//   ];

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       <div
//         className={`fixed md:relative z-50 bg-gray-900 text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition duration-200 ease-in-out`}
//       >
//         <div className="flex items-center justify-between px-4">
//           <div className="flex items-center space-x-2">
//             <Car className="h-8 w-8 text-blue-400" />
//             <span className="text-2xl font-extrabold">Car Depot</span>
//           </div>
//           <button
//             className="md:hidden p-2 rounded hover:bg-gray-800"
//             onClick={toggleSidebar}
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <nav className="space-y-2">
//           {navItems.map(({ to, icon: Icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
//                   isActive ? "bg-gray-700 border-r-4 border-blue-400" : ""
//                 }`
//               }
//               onClick={toggleSidebar}
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         <div className="absolute bottom-6 left-0 right-0 px-2">
//           <button
//             onClick={logout}
//             className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 w-full text-left"
//           >
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Plus, LogOut, X, MessageSquare, FileText } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { logout } = useAuth();

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/cars/create", icon: Plus, label: "Add Car" },
    { to: "/drafts", icon: FileText, label: "Draft Cars" },
    { to: "/testimonials", icon: MessageSquare, label: "Testimonials" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:relative z-50 bg-gray-900 text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-extrabold">Car Depot</span>
          </div>
          <button
            className="md:hidden p-2 rounded hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 border-r-4 border-blue-400" : ""
                }`
              }
              onClick={toggleSidebar}
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
    </>
  );
}