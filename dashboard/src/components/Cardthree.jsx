export default function Cardthree() {
  const alerts = ["Task 1: Backend API", "Task 2: UI Testing", "Task 3: Database Migration"];
  
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 md:h-90 shadow-sm">
      <h3 className="text-lg md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">Workload Alerts</h3>
      <div className="space-y-3 md:space-y-6">
        {alerts.map((task, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 transition-colors">
            <span className="h-2 w-2 md:h-3 md:w-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700 truncate">{task}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

