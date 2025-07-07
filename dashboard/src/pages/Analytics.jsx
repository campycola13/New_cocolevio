import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter 
} from 'recharts';
import { 
  FiTrendingDown, FiActivity, FiTarget, FiClock, 
  FiUsers, FiAlertTriangle, FiFilter, FiDownload, FiX 
} from 'react-icons/fi';

const getStatusDistribution = () => {
  const statusCounts = projectData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    color: status === 'Done' ? '#10B981' : status === 'In Progress' ? '#F59E0B' : '#6B7280'
  }));
};

const getPriorityDistribution = () => {
  const priorityCounts = projectData.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(priorityCounts).map(([priority, count]) => ({
    priority,
    count,
    percentage: Math.round((count / projectData.length) * 100)
  }));
};

const getTeamWorkload = () => {
  const teamWorkload = projectData.reduce((acc, item) => {
    if (!acc[item.assignee]) {
      acc[item.assignee] = { 
        name: item.assignee, 
        tasks: 0, 
        estimated: 0, 
        spent: 0,
        efficiency: 0
      };
    }
    acc[item.assignee].tasks += 1;
    acc[item.assignee].estimated += item.estimate;
    acc[item.assignee].spent += item.spent;
    return acc;
  }, {});

  return Object.values(teamWorkload).map(member => ({
    ...member,
    efficiency: member.estimated > 0 ? Math.round((member.spent / member.estimated) * 100) : 0
  }));
};

const getTypeDistribution = () => {
  const typeCounts = projectData.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / projectData.length) * 100)
  }));
};

const getOverdueItems = () => {
  const today = new Date();
  return projectData.filter(item => {
    const dueDate = new Date(item.due);
    return dueDate < today && item.status !== 'Done';
  }).length;
};

const getCompletionRate = () => {
  const completed = projectData.filter(item => item.status === 'Done').length;
  return Math.round((completed / projectData.length) * 100);
};

const getTotalTimeSpent = () => {
  return projectData.reduce((total, item) => total + item.spent, 0);
};

const getTotalEstimated = () => {
  return projectData.reduce((total, item) => total + item.estimate, 0);
};

function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [projectData, setProjectData] = useState([]);
  const [risky, setRisky] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/risky_notrisky')
      .then(res => res.json())
      .then(data => {
        setRisky(data[0]);  // risky
        setTotal(data[1]);  // total
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);


  useEffect(() => {
  fetch('http://localhost:5000/project-data')
    .then((res) => res.json())
    .then((json) => {
      setProjectData(json);
      console.log("newdata", json); // Correct place
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);




  const getStatusDistribution = () => {

  const statusCounts = projectData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    color: status === 'Done' ? '#10B981' : status === 'In Progress' ? '#F59E0B' : '#6B7280'
  }));
};

const getPriorityDistribution = () => {
  const priorityCounts = projectData.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(priorityCounts).map(([priority, count]) => ({
    priority,
    count,
    percentage: Math.round((count / projectData.length) * 100)
  }));
};

const getTeamWorkload = () => {
  const teamWorkload = projectData.reduce((acc, item) => {
    if (!acc[item.assignee]) {
      acc[item.assignee] = { 
        name: item.assignee, 
        tasks: 0, 
        estimated: 0, 
        spent: 0,
        efficiency: 0
      };
    }
    acc[item.assignee].tasks += 1;
    acc[item.assignee].estimated += item.estimate;
    acc[item.assignee].spent += item.spent;
    return acc;
  }, {});

  return Object.values(teamWorkload).map(member => ({
    ...member,
    efficiency: member.estimated > 0 ? Math.round((member.spent / member.estimated) * 100) : 0
  }));
};

const getTypeDistribution = () => {
  const typeCounts = projectData.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / projectData.length) * 100)
  }));
};

const getOverdueItems = () => {
  const today = new Date();
  return projectData.filter(item => {
    const dueDate = new Date(item.due);
    return dueDate < today && item.status !== 'Done';
  }).length;
};

const getCompletionRate = () => {
  const completed = projectData.filter(item => item.status === 'Done').length;
  return Math.round((completed / projectData.length) * 100);
};

const getTotalTimeSpent = () => {
  return projectData.reduce((total, item) => total + item.spent, 0);
};

const getTotalEstimated = () => {
  return projectData.reduce((total, item) => total + item.estimate, 0);
};
  
  
  // Filter states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [teamFilters, setTeamFilters] = useState({
    minTasks: '',
    maxTasks: '',
    minEfficiency: '',
    maxEfficiency: '',
    performanceStatus: 'all',
    selectedMembers: []
  });
  const [appliedFilters, setAppliedFilters] = useState({
    minTasks: '',
    maxTasks: '',
    minEfficiency: '',
    maxEfficiency: '',
    performanceStatus: 'all',
    selectedMembers: []
  });

  const statusDistribution = getStatusDistribution();
  const priorityDistribution = getPriorityDistribution();
  const allTeamWorkload = getTeamWorkload();
  const typeDistribution = getTypeDistribution();
  const overdueItems = getOverdueItems();
  const totalTimeSpent = getTotalTimeSpent();
  const totalEstimated = getTotalEstimated();

  // Filter team workload based on applied filters
  const getFilteredTeamWorkload = () => {
    return allTeamWorkload.filter(member => {
      // Tasks filter
      if (appliedFilters.minTasks && member.tasks < parseInt(appliedFilters.minTasks)) return false;
      if (appliedFilters.maxTasks && member.tasks > parseInt(appliedFilters.maxTasks)) return false;
      
      // Efficiency filter
      if (appliedFilters.minEfficiency && member.efficiency < parseInt(appliedFilters.minEfficiency)) return false;
      if (appliedFilters.maxEfficiency && member.efficiency > parseInt(appliedFilters.maxEfficiency)) return false;
      
      // Performance status filter
      if (appliedFilters.performanceStatus !== 'all') {
        const status = member.efficiency > 80 ? 'excellent' : member.efficiency > 60 ? 'good' : 'needs-attention';
        if (status !== appliedFilters.performanceStatus) return false;
      }
      
      // Selected members filter
      if (appliedFilters.selectedMembers.length > 0 && !appliedFilters.selectedMembers.includes(member.name)) {
        return false;
      }
      
      return true;
    });
  };

  const filteredTeamWorkload = getFilteredTeamWorkload();

  const handleApplyFilters = () => {
    setAppliedFilters({ ...teamFilters });
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    const resetFilters = {
      minTasks: '',
      maxTasks: '',
      minEfficiency: '',
      maxEfficiency: '',
      performanceStatus: 'all',
      selectedMembers: []
    };
    setTeamFilters(resetFilters);
    setAppliedFilters(resetFilters);
    setShowFilterModal(false);
  };

  const handleMemberToggle = (memberName) => {
    setTeamFilters(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(memberName)
        ? prev.selectedMembers.filter(name => name !== memberName)
        : [...prev.selectedMembers, memberName]
    }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (appliedFilters.minTasks) count++;
    if (appliedFilters.maxTasks) count++;
    if (appliedFilters.minEfficiency) count++;
    if (appliedFilters.maxEfficiency) count++;
    if (appliedFilters.performanceStatus !== 'all') count++;
    if (appliedFilters.selectedMembers.length > 0) count++;
    return count;
  };

  const kpiCards = [
    {
      title: 'Risky tasks',
      value: `${risky}/${total}`,
      icon: FiTrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Overdue Items',
      value: overdueItems.toString(),
      icon: FiAlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Active Tasks',
      value: projectData.filter(p => p.status === 'In Progress').length.toString(),
      icon: FiActivity,
      color: 'text-blue-600'
    },
    {
      title: 'Team Members',
      value: new Set(projectData.map(p => p.assignee)).size.toString(),
      icon: FiUsers,
      color: 'text-purple-600'
    }
  ];

  const navigate = useNavigate();

  const handleCardClick = (title) => {
     if (title === 'Risky tasks') {
       navigate('/risk');
     }
   };

  // Sidebar state management
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024);
        if (window.innerWidth >= 1024) {
          setIsSidebarExpanded(true);
        } else {
          setIsSidebarExpanded(false);
        }
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded} 
        isMobile={isMobile}
      />
      
      {/* Main content area with responsive margin based on sidebar state */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? 'ml-48' : 'ml-16'
      }`}>
        <Topbar 
          onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          isMobile={isMobile}
          isSidebarOpen={isSidebarExpanded}
        />
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-3">Analytics</h1>
              <p className="text-gray-600 text-base md:text-xl">Project management insights and team performance metrics</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-6 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="current">Current Sprint</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              
              <button className="flex items-center gap-3 px-6 py-3 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FiDownload size={20} />
                Export Report
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((kpi, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200" onClick={() => handleCardClick(kpi.title)}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-2 rounded-lg bg-gray-50 ${kpi.color}`}>
                    <kpi.icon size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</h3>
                <p className="text-gray-600 text-base">{kpi.title}</p>
              </div>
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Task Status Distribution */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Task Status Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {statusDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-base text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-base font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Priority Distribution</h3>
              <div className="space-y-6">
                {priorityDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        item.priority === 'P1' ? 'bg-red-500' : 
                        item.priority === 'P2' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="font-medium text-base">{item.priority}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-base">{item.count}</div>
                      <div className="text-sm text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Type Breakdown */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Work Type Breakdown</h3>
              <div className="space-y-6">
                {typeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        item.type === 'Story' ? 'bg-blue-500' : 
                        item.type === 'Task' ? 'bg-green-500' : 
                        item.type === 'Bug' ? 'bg-red-500' : 'bg-purple-500'
                      }`}></div>
                      <span className="font-medium text-base">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-base">{item.count}</div>
                      <div className="text-sm text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workload Distribution */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Team Workload Distribution</h3>
              <ResponsiveContainer width="100%" height={400} className='mt-16'>
                <BarChart data={allTeamWorkload} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={120} 
                    tick={{ fontSize: 12 }} 
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    domain={[0, 'dataMax + 1']}
                    allowDecimals={false}
                  />
                  <Tooltip contentStyle={{ fontSize: '16px' }} />
                  <Bar dataKey="tasks" fill="#3B82F6" name="Tasks" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Time Tracking Overview</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-center p-6 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-base text-gray-600">Total Estimated</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {Math.round(totalEstimated / 3600)}h
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <FiTarget size={24} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-6 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-base text-gray-600">Total Spent</div>
                    <div className="text-2xl font-bold text-green-800">
                      {Math.round(totalTimeSpent / 3600)}h
                    </div>
                  </div>
                  <div className="text-green-600">
                    <FiClock size={24} />
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-base text-gray-600">Time Efficiency</div>
                    <div className="text-2xl font-bold text-purple-800">
                      {totalEstimated > 0 ? Math.round((totalTimeSpent / totalEstimated) * 100) : 0}%
                    </div>
                  </div>
                  <div className="text-purple-600">
                    <FiActivity size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Team Analysis */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900">Team Performance Details</h3>
              <div className="flex items-center gap-4">
                {getActiveFiltersCount() > 0 && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} active
                  </span>
                )}
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="flex items-center gap-3 px-4 py-3 text-base border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FiFilter size={20} />
                  Filter Team
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-lg font-semibold">Team Member</th>
                    <th className="text-left py-4 px-6 text-lg font-semibold">Active Tasks</th>
                    <th className="text-left py-4 px-6 text-lg font-semibold">Estimated (hrs)</th>
                    <th className="text-left py-4 px-6 text-lg font-semibold">Spent (hrs)</th>
                    <th className="text-left py-4 px-6 text-lg font-semibold">Efficiency</th>
                    <th className="text-left py-4 px-6 text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamWorkload.length > 0 ? (
                    filteredTeamWorkload.map((member, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-xl">{member.name}</td>
                        <td className="py-4 px-6 text-base">{member.tasks}</td>
                        <td className="py-4 px-6 text-base">{Math.round(member.estimated / 3600)}</td>
                        <td className="py-4 px-6 text-base">{Math.round(member.spent / 3600)}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-16 bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full ${
                                  member.efficiency > 80 ? 'bg-green-500' : 
                                  member.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(member.efficiency, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-base">{member.efficiency}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 rounded-full lg:text-base font-medium ${
                            member.efficiency > 80 ? 'bg-green-100 text-green-800' :
                            member.efficiency > 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {member.efficiency > 80 ? 'Excellent' : member.efficiency > 60 ? 'Good' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 px-6 text-center text-gray-500 text-xl">
                        No team members match the current filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Filter Team Members</h3>
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Task Count Filters */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Task Count</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Tasks</label>
                        <input
                          type="number"
                          value={teamFilters.minTasks}
                          onChange={(e) => setTeamFilters(prev => ({ ...prev, minTasks: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Tasks</label>
                        <input
                          type="number"
                          value={teamFilters.maxTasks}
                          onChange={(e) => setTeamFilters(prev => ({ ...prev, maxTasks: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Filters */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Efficiency (%)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Efficiency</label>
                        <input
                          type="number"
                          value={teamFilters.minEfficiency}
                          onChange={(e) => setTeamFilters(prev => ({ ...prev, minEfficiency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Efficiency</label>
                        <input
                          type="number"
                          value={teamFilters.maxEfficiency}
                          onChange={(e) => setTeamFilters(prev => ({ ...prev, maxEfficiency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="100"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Performance Status Filter */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Performance Status</h4>
                    <select
                      value={teamFilters.performanceStatus}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, performanceStatus: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Performance Levels</option>
                      <option value="excellent">Excellent (80%+)</option>
                      <option value="good">Good (60-80%)</option>
                      <option value="needs-attention">Needs Attention (less than 60%)</option>
                    </select>
                  </div>

                  {/* Specific Team Members */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Specific Team Members</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {allTeamWorkload.map((member, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={teamFilters.selectedMembers.includes(member.name)}
                            onChange={() => handleMemberToggle(member.name)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{member.name}</span>
                          <span className="text-sm text-gray-500">({member.tasks} tasks, {member.efficiency}% efficiency)</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear All Filters
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFilterModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;