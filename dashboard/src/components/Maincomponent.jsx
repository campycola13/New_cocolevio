import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function MainComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Sidebar 
        isExpanded={isExpanded} 
        setIsExpanded={setIsExpanded} 
        isMobile={isMobile} 
      />
      
      <div style={{ marginLeft: !isMobile && !isExpanded ? '64px' : '0px' }}>
        <Topbar 
          onToggleSidebar={handleToggleSidebar}
          isMobile={isMobile}
          isSidebarOpen={isExpanded}
        />
        
        <main style={{ padding: '20px' }}>
          <h1>Your Dashboard</h1>
          <p>Content goes here</p>
        </main>
      </div>
    </div>
  );
}

export default MainComponent;