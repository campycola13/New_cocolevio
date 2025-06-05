import ReactApexChart from "react-apexcharts";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Card() {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl md:h-90 p-4 md:p-6 shadow-sm">
      <h3 className="text-lg md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">Project Progress</h3>
      <div className="flex flex-col sm:flex-row items-center justify-between lg:mr-12 gap-4">
        <div className="flex flex-col space-y-3 md:space-y-9 order-2 md:mt-12 sm:order-1">
          <div className="flex items-center space-x-3">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-[#3A30FF] rounded"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">Completed (65%)</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-[#F000F0] rounded"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">Remaining (35%)</p>
          </div>
        </div>
        
        {/* Simple CSS Pie Chart */}
        <PieChart
          className="md:mt-4"
          series={[
            {
              data: [
                { id: 0, value: 65, color: "#3A30FF" },
                { id: 1, value: 35 ,color: "#F000F0"},
              ],
            },
          ]}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}




