import { useState } from 'react'
import React from 'react'
import '../App.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Cardtwo from '../components/Cardtwo'
import Prioritytask from '../components/Prioritytask'


function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isMobile={isMobile} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        !isMobile && isExpanded ? 'ml-80' : !isMobile && !isExpanded ? 'ml-16' : 'ml-0'
      }`}>
        <Topbar />
        
        {/* Dashboard Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold mb-2 text-gray-900">Dashboard</h1>
            <p className="text-base md:text-2xl lg:text-xl text-gray-600 font-medium">Welcome Back, David</p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card />
            <Cardtwo />
          </div>
          
          {/* Priority Tasks Section */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-900">Priority Tasks</h2>
            <Prioritytask />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
