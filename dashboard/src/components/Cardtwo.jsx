import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [2];
const pData = [8];
const yLabels = ['']; // yAxis holds the label

export default function Cardtwo() {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
      <h3 className="text-lg md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">Estimated Delay</h3>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-green-500"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">Given time</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-red-500"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">Extra time</p>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="flex h-4 md:h-12 w-full max-w-2xl bg-gray-200 rounded overflow-hidden md:mt-12">
              <div className="bg-green-500 h-full" style={{ width: '80%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '20%' }}></div>
            </div>
            <span className="ml-3 text-xs md:text-xl md:mt-12 font-medium text-gray-600 whitespace-nowrap">8 + 2 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}