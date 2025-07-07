import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  

export default function TaskStatusLineChart() {

   const [data, setData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/weekly-status')
      .then((res) => res.json())
      .then((json) => {
        
        const chartData = json.map((item, index) => ({
          week: item.week || (index === 0 ? 'Total' : ''),
          Done: item['Done'] || 0,
          'To Do': item['To Do'] || 0,
          'In Progress': item['In Progress'] || 0,
        }));
        console.log(chartData);
        setData(chartData);
      });
  }, [])




  return (


    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-base md:text-xl font-semibold mb-6 text-gray-800">
        Weekly task status
      </h3>
      
      <div className="h-80 lg:h-90 w-full">
        <ResponsiveContainer width="100%" height="100%" className="mt-8">
          <LineChart
            data={data}
            margin={{
              top: 32,
              right: 30,
              left: 60,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 16 }}
              angle={0}
              textAnchor="middle"
              height={60}
            />
            <YAxis 
              className='font-medium text-base'
              label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              tick={{ fontSize: 16 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line 
              type="monotone" 
              dataKey="Done" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="To Do" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="In Progress" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}