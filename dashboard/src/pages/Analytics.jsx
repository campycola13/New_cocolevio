import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter 
} from 'recharts';
import { 
  FiTrendingUp, FiTrendingDown, FiActivity, FiTarget, FiClock, 
  FiUsers, FiAlertTriangle, FiCheckCircle, FiFilter, FiDownload 
} from 'react-icons/fi';

// Process the actual project data
const projectData = [
  { id: 28419, type: 'Task', priority: 'P2', assignee: 'Raghav Singh', status: 'To Do', estimate: 47961.33757, spent: 0, created: '2025-05-21', due: '2025-06-26' },
  { id: 28418, type: 'Task', priority: 'P2', assignee: 'Raghav Singh', status: 'To Do', estimate: 115200, spent: 0, created: '2025-06-25', due: '2025-06-13' },
  { id: 28416, type: 'Task', priority: 'P1', assignee: 'Avneesh Giri', status: 'Done', estimate: 42287.33621, spent: 7200, created: '2025-06-13', due: '2025-06-27' },
  { id: 28415, type: 'Task', priority: 'P1', assignee: 'Shourya Dubey', status: 'To Do', estimate: 42854.66111, spent: 0, created: '2025-06-24', due: '2025-06-28' },
  { id: 28414, type: 'Task', priority: 'P1', assignee: 'Shruti Chauhan', status: 'To Do', estimate: 46853.00375, spent: 0, created: '2025-06-01', due: '2025-06-10' },
  { id: 28281, type: 'Bug', priority: 'P2', assignee: 'Raghav Singh', status: 'To Do', estimate: 19016.53881, spent: 0, created: '2025-06-26', due: '2025-06-12' },
  { id: 28249, type: 'Story', priority: 'P1', assignee: 'Raghav Singh', status: 'In Progress', estimate: 28800, spent: 28800, created: '2025-06-06', due: '2025-06-10' },
  { id: 28248, type: 'Story', priority: 'P1', assignee: 'Shruti Chauhan', status: 'In Progress', estimate: 67676.16708, spent: 46800, created: '2025-06-09', due: '2025-06-24' },
  { id: 28186, type: 'Story', priority: 'P1', assignee: 'Shourya Dubey', status: 'In Progress', estimate: 79341.12496, spent: 7200, created: '2025-06-18', due: '2025-06-21' },
  { id: 28185, type: 'Story', priority: 'P1', assignee: 'Shourya Dubey', status: 'In Progress', estimate: 76978.72682, spent: 32400, created: '2025-06-08', due: '2025-06-28' },
  { id: 28184, type: 'Story', priority: 'P1', assignee: 'Shourya Dubey', status: 'In Progress', estimate: 68658.66729, spent: 28800, created: '2025-06-22', due: '2025-06-25' },
  { id: 28183, type: 'Story', priority: 'P1', assignee: 'Shourya Dubey', status: 'In Progress', estimate: 68874.92222, spent: 21600, created: '2025-06-21', due: '2025-06-26' },
  { id: 28182, type: 'Story', priority: 'P1', assignee: 'Raghav Singh', status: 'In Progress', estimate: 75276.48031, spent: 57600, created: '2025-06-22', due: '2025-06-19' },
  { id: 28153, type: 'Task', priority: 'P2', assignee: 'Raghav Singh', status: 'In Progress', estimate: 28800, spent: 28800, created: '2025-06-14', due: '2025-06-27' },
  { id: 28116, type: 'Task', priority: 'P2', assignee: 'Shourya Dubey', status: 'In Progress', estimate: 44340.22492, spent: 36000, created: '2025-06-27', due: '2025-06-24' },
  { id: 28052, type: 'Story', priority: 'P2', assignee: 'Raghav Singh', status: 'In Progress', estimate: 69408.71395, spent: 3600, created: '2025-06-02', due: '2025-06-23' },
  { id: 28051, type: 'Story', priority: 'P2', assignee: 'Shruti Chauhan', status: 'To Do', estimate: 68334.40885, spent: 0, created: '2025-05-30', due: '2025-06-30' },
  { id: 28050, type: 'Story', priority: 'P1', assignee: 'Shruti Chauhan', status: 'In Progress', estimate: 67519.7307, spent: 63000, created: '2025-06-24', due: '2025-06-06' },
  { id: 28020, type: 'Story', priority: 'P2', assignee: 'Anand Kumar Chaudhary', status: 'In Progress', estimate: 78829.4223, spent: 7200, created: '2025-06-05', due: '2025-06-25' },
  { id: 28019, type: 'Story', priority: 'P2', assignee: 'Anand Kumar Chaudhary', status: 'In Progress', estimate: 68329.25136, spent: 7200, created: '2025-06-29', due: '2025-06-15' },
  { id: 28018, type: 'Story', priority: 'P4', assignee: 'Tarun Bhati', status: 'In Progress', estimate: 14400, spent: 7200, created: '2025-06-29', due: '2025-06-30' },
  { id: 27951, type: 'Story', priority: 'P2', assignee: 'Avneesh Giri', status: 'In Progress', estimate: 71961.06464, spent: 39600, created: '2025-05-31', due: '2025-06-11' }
];

// Calculate actual metrics from the data
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

  const statusDistribution = getStatusDistribution();
  const priorityDistribution = getPriorityDistribution();
  const teamWorkload = getTeamWorkload();
  const typeDistribution = getTypeDistribution();
  const overdueItems = getOverdueItems();
  const completionRate = getCompletionRate();
  const totalTimeSpent = getTotalTimeSpent();
  const totalEstimated = getTotalEstimated();

  const kpiCards = [
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: completionRate > 50 ? '+5%' : '-2%',
      trend: completionRate > 50 ? 'up' : 'down',
      icon: FiCheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Overdue Items',
      value: overdueItems.toString(),
      change: overdueItems > 5 ? '+2' : '-1',
      trend: overdueItems > 5 ? 'up' : 'down',
      icon: FiAlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Active Projects',
      value: projectData.filter(p => p.status === 'In Progress').length.toString(),
      change: '+3',
      trend: 'up',
      icon: FiActivity,
      color: 'text-blue-600'
    },
    {
      title: 'Team Members',
      value: new Set(projectData.map(p => p.assignee)).size.toString(),
      change: '+1',
      trend: 'up',
      icon: FiUsers,
      color: 'text-purple-600'
    }
  ];

  // Sidebar state management
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
  
    // Check if screen is mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
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
        isSidebarExpanded ? 'ml-80' : 'ml-16'
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">CocolevioHR Analytics</h1>
                <p className="text-gray-600">Project management insights and team performance metrics</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <select 
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Time</option>
                    <option value="current">Current Sprint</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FiDownload size={16} />
                    Export Report
                </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {kpiCards.map((kpi, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${kpi.color}`}>
                        <kpi.icon size={24} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {kpi.trend === 'up' ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
                        {kpi.change}
                    </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                    <p className="text-gray-600 text-sm">{kpi.title}</p>
                </div>
                ))}
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                {/* Task Status Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                    <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                    {statusDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}</span>
                    </div>
                    ))}
                </div>
                </div>

                {/* Priority Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Priority Distribution</h3>
                <div className="space-y-4">
                    {priorityDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                            item.priority === 'P1' ? 'bg-red-500' : 
                            item.priority === 'P2' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="font-medium">{item.priority}</span>
                        </div>
                        <div className="text-right">
                        <div className="font-semibold">{item.count}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Work Type Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Work Type Breakdown</h3>
                <div className="space-y-4">
                    {typeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                            item.type === 'Story' ? 'bg-blue-500' : 
                            item.type === 'Task' ? 'bg-green-500' : 
                            item.type === 'Bug' ? 'bg-red-500' : 'bg-purple-500'
                        }`}></div>
                        <span className="font-medium">{item.type}</span>
                        </div>
                        <div className="text-right">
                        <div className="font-semibold">{item.count}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Team Performance */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Workload Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamWorkload}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3B82F6" name="Tasks" />
                    </BarChart>
                </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Time Tracking Overview</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                        <div className="text-sm text-gray-600">Total Estimated</div>
                        <div className="text-2xl font-bold text-blue-800">
                        {Math.round(totalEstimated / 3600)}h
                        </div>
                    </div>
                    <div className="text-blue-600">
                        <FiTarget size={32} />
                    </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                        <div className="text-sm text-gray-600">Total Spent</div>
                        <div className="text-2xl font-bold text-green-800">
                        {Math.round(totalTimeSpent / 3600)}h
                        </div>
                    </div>
                    <div className="text-green-600">
                        <FiClock size={32} />
                    </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                        <div className="text-sm text-gray-600">Time Efficiency</div>
                        <div className="text-2xl font-bold text-purple-800">
                        {totalEstimated > 0 ? Math.round((totalTimeSpent / totalEstimated) * 100) : 0}%
                        </div>
                    </div>
                    <div className="text-purple-600">
                        <FiActivity size={32} />
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Detailed Team Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Performance Details</h3>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FiFilter size={16} />
                    Filter Team
                </button>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Team Member</th>
                        <th className="text-left py-3 px-4">Active Tasks</th>
                        <th className="text-left py-3 px-4">Estimated (hrs)</th>
                        <th className="text-left py-3 px-4">Spent (hrs)</th>
                        <th className="text-left py-3 px-4">Efficiency</th>
                        <th className="text-left py-3 px-4">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teamWorkload.map((member, index) => (
                        <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{member.name}</td>
                        <td className="py-3 px-4">{member.tasks}</td>
                        <td className="py-3 px-4">{Math.round(member.estimated / 3600)}</td>
                        <td className="py-3 px-4">{Math.round(member.spent / 3600)}</td>
                        <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                className={`h-2 rounded-full ${
                                    member.efficiency > 80 ? 'bg-green-500' : 
                                    member.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(member.efficiency, 100)}%` }}
                                ></div>
                            </div>
                            <span className="text-xs">{member.efficiency}%</span>
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.efficiency > 80 ? 'bg-green-100 text-green-800' :
                            member.efficiency > 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                            }`}>
                            {member.efficiency > 80 ? 'Excellent' : member.efficiency > 60 ? 'Good' : 'Needs Attention'}
                            </span>
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

export default Analytics;