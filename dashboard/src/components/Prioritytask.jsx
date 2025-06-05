import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

export default function PriorityTask() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const allTasks = [
    { id: 1, task: "Design UI Components", assignedTo: "John Doe", progress: 75, delay: 2, status: "In Progress", priority: "High" },
    { id: 2, task: "Backend Integration", assignedTo: "Jane Smith", progress: 45, delay: 5, status: "In Progress", priority: "Critical" },
    { id: 3, task: "Testing & QA", assignedTo: "Mike Johnson", progress: 20, delay: 1, status: "In Progress", priority: "Medium" },
    { id: 4, task: "Database Optimization", assignedTo: "Sarah Wilson", progress: 90, delay: 0, status: "Nearly Complete", priority: "High" },
    { id: 5, task: "User Authentication", assignedTo: "John Doe", progress: 100, delay: 0, status: "Complete", priority: "Critical" },
    { id: 6, task: "API Documentation", assignedTo: "Alex Chen", progress: 60, delay: 3, status: "In Progress", priority: "Low" },
    { id: 7, task: "Mobile Responsive Design", assignedTo: "Emma Davis", progress: 30, delay: 4, status: "In Progress", priority: "Medium" },
    { id: 8, task: "Payment Gateway Integration", assignedTo: "Jane Smith", progress: 85, delay: 1, status: "Nearly Complete", priority: "Critical" },
    { id: 9, task: "Error Logging System", assignedTo: "Mike Johnson", progress: 10, delay: 7, status: "Not Started", priority: "Low" },
    { id: 10, task: "Performance Monitoring", assignedTo: "Sarah Wilson", progress: 50, delay: 2, status: "In Progress", priority: "Medium" },
    { id: 11, task: "Security Audit", assignedTo: "Alex Chen", progress: 0, delay: 10, status: "Not Started", priority: "High" },
    { id: 12, task: "Code Review Process", assignedTo: "Emma Davis", progress: 100, delay: 0, status: "Complete", priority: "Medium" },
    { id: 13, task: "Email Notification System", assignedTo: "John Doe", progress: 65, delay: 1, status: "In Progress", priority: "Low" },
    { id: 14, task: "Data Migration", assignedTo: "Sarah Wilson", progress: 80, delay: 2, status: "Nearly Complete", priority: "High" },
    { id: 15, task: "Load Testing", assignedTo: "Mike Johnson", progress: 35, delay: 3, status: "In Progress", priority: "Medium" },
    { id: 16, task: "User Dashboard", assignedTo: "Emma Davis", progress: 70, delay: 1, status: "In Progress", priority: "High" },
    { id: 17, task: "Third-party API Integration", assignedTo: "Alex Chen", progress: 25, delay: 6, status: "In Progress", priority: "Critical" },
    { id: 18, task: "Backup System", assignedTo: "Jane Smith", progress: 95, delay: 0, status: "Nearly Complete", priority: "Medium" },
    { id: 19, task: "User Onboarding Flow", assignedTo: "John Doe", progress: 40, delay: 4, status: "In Progress", priority: "High" },
    { id: 20, task: "Analytics Implementation", assignedTo: "Sarah Wilson", progress: 15, delay: 8, status: "Not Started", priority: "Low" }
  ];

  const uniqueAssignees = [...new Set(allTasks.map(task => task.assignedTo))];
  const uniqueStatuses = [...new Set(allTasks.map(task => task.status))];

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesAssignee = assigneeFilter === "all" || task.assignedTo === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesAssignee;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTasks = sortedTasks.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-700 bg-red-100";
      case "High": return "text-orange-700 bg-orange-100";
      case "Medium": return "text-yellow-700 bg-yellow-100";
      case "Low": return "text-green-700 bg-green-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete": return "text-green-800 bg-green-100";
      case "Nearly Complete": return "text-blue-800 bg-blue-100";
      case "In Progress": return "text-yellow-800 bg-yellow-100";
      case "Not Started": return "text-gray-800 bg-gray-100";
      default: return "text-gray-800 bg-gray-100";
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <div className="w-4 h-4"></div>;
    return (
      <div className="w-4 h-4 flex items-center justify-center">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-900">Tasks</h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
              />
            </div>
            
            {/* Filters */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xl border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-3 py-2 text-xl border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Assignees</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('task')}
              >
                <div className="flex items-center gap-2">
                  Task
                  <SortIcon field="task" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('assignedTo')}
              >
                <div className="flex items-center gap-2">
                  Assigned To
                  <SortIcon field="assignedTo" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('progress')}
              >
                <div className="flex items-center gap-2">
                  Progress
                  <SortIcon field="progress" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center gap-2">
                  Priority
                  <SortIcon field="priority" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('delay')}
              >
                <div className="flex items-center gap-2">
                  Delay (Days)
                  <SortIcon field="delay" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xl font-medium text-gray-900">{task.task}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xl text-gray-900">{task.assignedTo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xl text-gray-900">{task.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xl font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xl font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                  {task.delay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-3 bg-white border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, sortedTasks.length)} of {sortedTasks.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm border rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* No Results */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tasks match your current filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setAssigneeFilter("all");
              setCurrentPage(1);
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}