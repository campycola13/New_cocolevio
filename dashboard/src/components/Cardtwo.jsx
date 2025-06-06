import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    Done: 85,
    'To Do': 95,
    'In Progress': 75
  },
  {
    week: 'May 25',
    Done: 105,
    'To Do': 100,
    'In Progress': 82
  },
  {
    week: 'Jun 1',
    Done: 110,
    'To Do': 102,
    'In Progress': 88
  },
  {
    week: 'Jun 8',
    Done: 115,
    'To Do': 108,
    'In Progress': 78
  },
  {
    week: 'Jun 15',
    Done: 120,
    'To Do': 112,
    'In Progress': 80
  },
  {
    week: 'Jun 22',
    Done: 95,
    'To Do': 100,
    'In Progress': 72
  },
  {
    week: 'Jun 29',
    Done: 18,
    'To Do': 15,
    'In Progress': 12
  }
];

export default function TaskStatusLineChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg md:text-3xl font-semibold mb-6 text-gray-800">
        Weekly task status
      </h3>
      
      <div className="h-90 lg:h-120 w-full">
        <ResponsiveContainer width="100%" height="100%" className="mt-16">
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