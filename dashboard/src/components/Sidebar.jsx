import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active item based on current route
  const getActiveItemFromPath = (pathname) => {
    switch (pathname) {
      case '/':
        return 'dashboard';
      case '/settings':
        return 'settings';
      case '/analytics':
        return 'analytics';
      default:
        return 'dashboard';
    }
  };

  const [activeItem, setActiveItem] = useState(() => getActiveItemFromPath(location.pathname));

  // Update active item when route changes
  useEffect(() => {
    const newActiveItem = getActiveItemFromPath(location.pathname);
    setActiveItem(newActiveItem);
  }, [location.pathname]);

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, [setIsExpanded]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Add your logout logic here (clear tokens, etc.)
      console.log("User confirmed logout");
      // Redirect to login page
      navigate('/login');
    }
  };

  const handleItemClick = (id) => {
    // Handle navigation directly
    switch (id) {
      case "dashboard":
        navigate('/');
        break;
      case "settings":
        navigate('/settings');
        break;
      case "analytics":
        navigate('/analytics');
        break;
      case "logout":
        handleLogout();
        return; // Don't set active state for logout
      default:
        break;
    }
    
    // Close sidebar on mobile after selection
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
            ? "translate-x-0 w-48" 
            : "translate-x-0 w-16"
        }`}
      >
        <div className="flex items-center justify-between h-24 p-4 border-b border-gray-700">
          {(isExpanded || !isMobile) && (
            <span className={`font-semibold whitespace-nowrap transition-opacity duration-200 ${
              isExpanded ? "opacity-100 text-xl md:text-2xl" : "opacity-0 text-0"
            }`}>
              Navigation
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className={isExpanded ? "p-2 rounded-lg bg-gray-800 transition-colors duration-200 ml-auto" : "p-2 rounded-lg bg-gray-800 transition-colors duration-200 ml-auto fixed"}
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
                size={20}
                className={`flex-shrink-0 ${activeItem === id ? "text-blue-400" : "text-gray-400"}`}
              />
              {isExpanded && (
                <span className="ml-3 transition-opacity duration-200 text-lg">
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