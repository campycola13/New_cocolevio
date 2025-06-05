import React from "react";
import { FiBell, FiMenu} from "react-icons/fi";

export default function Topbar({ onToggleSidebar = () => {}, isMobile = false, isSidebarOpen = false }) {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
        {/* Mobile Menu Button + Project Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto order-2 sm:order-1">
          {/* Menu Button - Only show on mobile screens when sidebar is closed */}
          
          
          {/* Project Selector */}
          {/* Project Selector with Icon */}
          <div className="flex flex-row items-center gap-2 flex-1 sm:w-64 md:w-80">
            {/* Database Icon - positioned to the left */}
            <select className="flex-1 px-3 py-2 text-sm md:text-base  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
              <option>Select project</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end order-1 sm:order-2">
          <FiBell className="h-6 w-6 md:h-8 md:w-8 text-black cursor-pointer hover:text-gray-600 flex-shrink-0" />
          <div className="flex flex-row items-center gap-3 min-w-0">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
              alt="Profile" 
              className="h-10 w-10 md:h-12 md:w-12 ml-4 rounded-xl object-cover flex-shrink-0"
            />
            <div className="min-w-0 xs:block mr-24">
              <p className="text-sm md:text-2xl font-semibold truncate">Alexandra Morrison</p>
              <p className="text-gray-600 text-xs md:text-xl truncate">alexandra66@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />
    </div>
  );
}