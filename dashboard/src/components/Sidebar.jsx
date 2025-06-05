import { useState, useCallback } from "react";
import {
  FiMenu,
  FiHome,
  FiLogOut,
  FiSettings,
  FiPieChart,
  FiChevronLeft
} from "react-icons/fi";

const navItems = [
  { icon: FiHome, label: "Dashboard", id: "dashboard" },
  { icon: FiPieChart, label: "Analytics", id: "analytics" },
  { icon: FiSettings, label: "Settings", id: "settings" },
  { icon: FiLogOut, label: "Logout", id: "logout" }
];

function Sidebar({ isExpanded, setIsExpanded, isMobile }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, [setIsExpanded]);

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isExpanded && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transition-transform duration-300 ease-in-out ${
          isExpanded 
            ? "translate-x-0 w-80" 
            : "translate-x-0 w-16"
        }`}
      >
        <div className="flex items-center justify-between h-24 p-4 border-b border-gray-700">
          {(isExpanded || !isMobile) && (
            <span className={`font-semibold whitespace-nowrap transition-opacity duration-200 ${
              isExpanded ? "opacity-100 text-xl md:text-4xl" : "opacity-0 text-0"
            }`}>
              Navigation
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className= {isExpanded ? "p-2 rounded-lg bg-gray-800 transition-colors duration-200 ml-auto" : "p-2 rounded-lg bg-gray-800 transition-colors duration-200 ml-auto fixed"}
            aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="mt-4">
          {navItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => handleItemClick(id)}
              className={`
                w-full flex items-center p-4 transition-all duration-200
                ${isExpanded ? "justify-start" : "justify-center"}
                ${activeItem === id ? "bg-gray-700" : "hover:bg-gray-700"}
                focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-inset
              `}
              aria-label={label}
            >
              <Icon
                size={36}
                className={`flex-shrink-0 ${activeItem === id ? "text-blue-400" : "text-gray-400"}`}
              />
              {isExpanded && (
                <span className="ml-3 transition-opacity duration-200 text-2xl">
                  {label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
export default Sidebar;
