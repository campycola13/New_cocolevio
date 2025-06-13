import React, { useState,useEffect } from "react";
import { FiUser, FiLock, FiBell, FiSettings } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AccountSettings = () => {
  // Add state for sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Add state for edit modes
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

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


  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    newsletter: true,
    updates: false,
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required";
    if (!profile.email) newErrors.email = "Email is required";
    if (!profile.phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfile()) {
      console.log("Profile updated", profile);
      setIsEditingProfile(false); // Exit edit mode after saving
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password updated", password);
    setIsEditingPassword(false); // Exit edit mode after saving
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
    setErrors({});
    // Optionally reset form data here if needed
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    // Optionally reset password fields here if needed
    setPassword({ current: "", new: "", confirm: "" });
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-row h-full">
      <Sidebar 
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        isMobile={isMobile}
      />
      <div className={`flex flex-col w-full transition-all duration-300 ${
        isSidebarExpanded && !isMobile ? 'ml-48' : 'ml-16'
      }`}>
        <Topbar 
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
          isSidebarOpen={isSidebarExpanded}
        />
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-none xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">Settings</h1>

            {/* Profile Section */}
            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md p-4 sm:p-8 mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <FiUser className="text-blue-600 mr-2 sm:mr-3" size={32} />
                  <h2 className="text-base md:text-2xl font-semibold text-gray-900">Profile Management</h2>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 text-base sm:text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FiSettings size={24} />
                    Edit
                  </button>
                )}
              </div>
              <div onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
                  <div>
                    <label className="block text-sm md:text-lg font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm md:text-lg font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm md:text-lg font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  {isEditingProfile ? (
                    <>
                      <button
                        type="submit"
                        onClick={handleProfileSubmit}
                        className="w-full sm:w-auto text-sm md:text-base bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelProfile}
                        className="w-full sm:w-auto text-sm md:text-base bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <p className="text-lg sm:text-base text-gray-600">Click "Edit" to modify your profile information.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md p-4 sm:p-8 mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <FiLock className="text-blue-600 mr-2 sm:mr-3" size={32} />
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Password Reset</h2>
                </div>
                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FiSettings size={24} />
                    Edit
                  </button>
                )}
              </div>
              <div onSubmit={handlePasswordSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
                  <div className="xl:col-span-1">
                    <label className="block text-sm md:text-lg font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      disabled={!isEditingPassword}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingPassword ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm md:text-lg font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      name="new"
                      value={password.new}
                      onChange={handlePasswordChange}
                      disabled={!isEditingPassword}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingPassword ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                  </div>
                  <div className="xl:col-span-1">
                    <label className="block text-sm md:text-lg font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      disabled={!isEditingPassword}
                      className={`mt-1 sm:mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base px-3 sm:px-4 py-2 focus:border-blue-500 focus:ring-blue-500 border ${
                        !isEditingPassword ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  {isEditingPassword ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                      <button
                        type="submit"
                        onClick={handlePasswordSubmit}
                        className="w-full sm:w-auto text-sm md:text-lg bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Reset Password
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPassword}
                        className="w-full sm:w-auto text-sm sm:text-base bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-600">Click "Edit" to change your password.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;