import React, { useEffect, useState } from 'react';
import { FiBell, FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onToggleSidebar = () => {}, isMobile = false, isSidebarOpen = false }) {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleRedirect = () => {
    navigate('/profile'); 
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/unique-projects')  // ✅ Removed double slashes
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const sendProjectToBackend = (project) => {
    fetch('http://localhost:5000/api/project-selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project }),
    })
    .then(response => response.json())
    .then(data => console.log("Backend response:", data))
    .catch(err => console.error("Error sending project to backend:", err));
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 gap-4">
        {/* Mobile Menu Button + Project Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto order-2 sm:order-1">
          <div className="flex flex-row items-center gap-2 flex-1 sm:w-64 md:w-80">
            <select
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                sendProjectToBackend(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-sm md:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              {projects.map((project, idx) => (
                <option key={idx} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 w-full p-2 rounded-md sm:w-auto justify-between sm:justify-end order-1 sm:order-2 hover:bg-gray-100">
          <div className="flex flex-row items-center cursor-pointer gap-4 min-w-0" onClick={handleRedirect}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
              alt="Profile" 
              className="h-10 w-10 md:h-12 md:w-12 ml-4 rounded-xl object-cover flex-shrink-0"
            />
            <div className="min-w-0 xs:block mr-24">
              <p className="text-sm md:text-lg font-semibold truncate">Alexandra Morrison</p>
              <p className="text-gray-600 text-xs md:text-base truncate">alexandra66@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />
    </div>
  );
}
