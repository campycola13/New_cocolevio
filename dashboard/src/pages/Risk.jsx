import React, { useState, useCallback, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import {
  FiHome,
  FiLogOut,
  FiSettings,
  FiPieChart,
  FiUser,
  FiCalendar
} from "react-icons/fi";







const navItems = [
  { icon: FiHome, label: "Dashboard", id: "dashboard" },
  { icon: FiPieChart, label: "Analytics", id: "analytics" },
  { icon: FiSettings, label: "Settings", id: "settings" },
  { icon: FiLogOut, label: "Logout", id: "logout" }
];



function TaskDashboard() {

   
const [projectData, setData] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/analytic/risk')
    .then(res => res.json())
    .then(data => setData(data))  // ✅ Correct function to update state
    .catch(err => console.error("Error fetching risk data:", err));
}, []);



  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (




    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isMobile={isMobile}
      />
      
      <div className={`transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'}`}>
        <Topbar 
          onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          isMobile={isMobile}
          isSidebarOpen={isSidebarExpanded}
        />
        
        <div className="p-6">
          <h1 className="text-lg md:text-2xl font-bold mb-2 text-gray-900">Risky tasks:</h1>
          {/* Tasks Data Grid */}
          <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectData.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{task.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiUser className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiCalendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{formatDate(task.created)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiCalendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{formatDate(task.due)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;