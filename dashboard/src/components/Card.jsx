import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Card() {
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://127.0.0.1:5000/progress');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        setCompleted(data.completed || 0);
        setRemaining(data.remaining || 100);
      } catch (err) {
        console.error("API error:", err);
        setError(err.message);
        setCompleted(0);
        setRemaining(100);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="Card h-100 w-180 bg-white mt-20 rounded-3xl flex flex-col justify-center items-center">
        <p className="text-xl">Loading progress...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl md:h-90 p-4 md:p-6 shadow-sm">
      <h3 className="text-lg md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">Project Progress</h3>
      <div className="flex flex-col sm:flex-row items-center justify-between lg:mr-12 gap-4">
        <div className="flex flex-col space-y-3 md:space-y-9 order-2 md:mt-12 sm:order-1">
          <div className="flex items-center space-x-3">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-[#3A30FF] rounded"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">
              Completed ({completed})
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="h-3 w-3 md:h-4 md:w-4 bg-[#F000F0] rounded"></span>
            <p className="text-sm md:text-xl font-medium text-gray-700">
              Remaining ({remaining})
            </p>
          </div>
        </div>

        <PieChart
          className="md:mt-4"
          series={[
            {
              data: [
                { id: 0, value: completed, color: "#3A30FF" },
                { id: 1, value: remaining, color: "#F000F0" },  // use remaining state here
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
