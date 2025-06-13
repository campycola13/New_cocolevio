import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiDownload, FiEdit } from "react-icons/fi";
import { BsGenderAmbiguous, BsGlobe2, BsTranslate } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import Calendar from "react-calendar";
import ReactApexChart from "react-apexcharts";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, text: "Excellent communication skills", date: "2023-12-01" },
    { id: 2, text: "Completed project ahead of schedule", date: "2023-12-05" }
  ]);
  const [newNote, setNewNote] = useState("");
  
  // Sidebar state management
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
        const checkMobile = () => {
          setIsMobile(window.innerWidth < 1024);
          if (window.innerWidth >= 1024) {
            setIsSidebarExpanded(true);
          } else {
            setIsSidebarExpanded(false);
          }
        };
    
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
      }, []);

  const userData = {
    name: "Alexandra Morrison",
    role: "Senior Product Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    email: "alexandra.morrison@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 2022",
    personalInfo: {
      dob: "15 June 1992",
      gender: "Female",
      nationality: "American",
      language: "English, Spanish",
      maritalStatus: "Single"
    },
    documents: [
      {
        name: "Professional_Certificate.pdf",
        type: "Certificate",
        date: "2023-05-15",
        category: "Certificates"
      },
      {
        name: "Design_Portfolio_2023.pdf",
        type: "Document",
        date: "2023-06-20",
        category: "Professional Credentials"
      },
      {
        name: "ID_Verification.pdf",
        type: "Identification",
        date: "2023-04-10",
        category: "Identification Documents"
      },
      {
        name: "Resume_2023.pdf",
        type: "Document",
        date: "2023-03-15",
        category: "Professional Credentials"
      },
      {
        name: "Training_Certificate.pdf",
        type: "Certificate",
        date: "2023-07-22",
        category: "Certificates"
      }
    ]
  };

  const filteredDocuments = userData.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded} 
        isMobile={isMobile}
      />
      
      {/* Main content area with responsive margin based on sidebar state */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? 'ml-48' : 'ml-16'
      }`}>
        <Topbar 
          onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
          isMobile={isMobile}
          isSidebarOpen={isSidebarExpanded}
        />
        
        <div className="p-3 sm:p-8">
          <div className="max-w-none xl:max-w-screen-2xl 2xl:max-w-none mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            
            {/* Profile Header */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
                <div className="relative flex-shrink-0">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-xl sm:rounded-2xl object-cover shadow-md"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
                    }}
                  />
                  <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-500 p-1.5 sm:p-2 rounded-full text-white hover:bg-blue-600 transition shadow-lg">
                    <FiEdit size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{userData.name}</h1>
                  <p className="text-base md:text-lg text-gray-600 mb-3 sm:mb-4">{userData.role}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                    <span className="px-2 py-1 sm:px-3 bg-blue-100 text-blue-800 rounded-full text-sm md:text-base">Product Design</span>
                    <span className="px-2 py-1 sm:px-3 bg-green-100 text-green-800 rounded-full text-sm md:text-base">UI/UX</span>
                    <span className="px-2 py-1 sm:px-3 bg-purple-100 text-purple-800 rounded-full text-sm md:text-base">Leadership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base md:text-xl font-semibold mb-3 sm:mb-4">Project Completion</h3>
                <div className="h-24 md:h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-blue-600">75%</div>
                    <div className="text-gray-600 text-base md:text-lg">Projects Completed</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h3 className="text-base md:text-xl font-semibold mb-3 sm:mb-4">Task Progress</h3>
                <div className="h-24 md:h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-green-600">42</div>
                    <div className="text-gray-600 text-base md:text-lg">Tasks This Month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Data */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4 sm:mb-6">Personal Data</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <FiCalendar className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Date of Birth</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base break-words">{userData.personalInfo.dob}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <BsGenderAmbiguous className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Gender</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.personalInfo.gender}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <BsGlobe2 className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Nationality</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.personalInfo.nationality}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <BsTranslate className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Languages</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.personalInfo.language}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <FiPhone className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <FiMapPin className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Location</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <FiMail className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <FiCalendar className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-gray-500">Join Date</p>
                    <p className="text-gray-800 font-medium text-sm md:text-base break-words">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Library */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg md:text-xl font-semibold">Documents Library</h2>
                <input
                  type="text"
                  placeholder="Search files..."
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base w-full sm:w-auto sm:max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {filteredDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out gap-3 sm:gap-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <IoDocumentTextOutline className="text-blue-500 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-800 font-medium text-sm md:text-base truncate">{doc.name}</p>
                        <p className="text-xs md:text-base text-gray-500 truncate">{doc.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 flex-shrink-0">
                      <span className="text-xs md:text-base text-gray-500">{doc.date}</span>
                      <button
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition flex-shrink-0"
                        aria-label="Download document"
                      >
                        <FiDownload size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredDocuments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm md:text-base">No documents found matching your search.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;