"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaTachometerAlt, FaUsers, FaUser } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx"; // Corrected import
import { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage User", path: "/dashboard/manage-user", icon: <FaUsers /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];
  const [isActive, setIsActive] = useState(false);
  const Path = usePathname();
  const handleLinkClick = (path: string) => {
    setIsActive(Path === path);
  };
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl">
      <div className="p-8 text-center border-b border-gray-700">
        <h1 className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Admin Panel
        </h1>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={clsx(
                  "flex items-center px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-700/50",
                  {
                    "bg-gray-700/50": isActive, // use the isActive prop directly
                  }
                )}
              >
                <span
                  className={clsx("mr-4 text-xl", {
                    "text-white": isActive,
                    "text-blue-400": !isActive,
                  })}
                >
                  {item.icon}
                </span>
                <span
                  className={clsx({
                    "font-semibold": isActive,
                    "font-medium": !isActive,
                  })}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
