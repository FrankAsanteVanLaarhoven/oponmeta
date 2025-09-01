import React, { useState } from 'react';

const tabs = [
  { label: 'Profile', key: 'profile' },
  { label: 'Password', key: 'password' },
  { label: 'Notifications', key: 'notifications' },
  { label: 'Account Management', key: 'account' },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-[#f6f9fc] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0a174e] mb-8 text-center">Platform Settings</h1>
        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${activeTab === tab.key ? 'bg-white text-[#0a174e] shadow' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Profile</h2>
              <form className="grid gap-4 max-w-md">
                <input type="text" placeholder="Full Name" className="border border-gray-300 rounded-md px-3 py-2" />
                <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-md px-3 py-2" />
                <button className="bg-[#0a174e] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#11235a] transition">Save Changes</button>
              </form>
            </div>
          )}
          {activeTab === 'password' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <form className="grid gap-4 max-w-md">
                <input type="password" placeholder="Current Password" className="border border-gray-300 rounded-md px-3 py-2" />
                <input type="password" placeholder="New Password" className="border border-gray-300 rounded-md px-3 py-2" />
                <input type="password" placeholder="Confirm New Password" className="border border-gray-300 rounded-md px-3 py-2" />
                <button className="bg-[#0a174e] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#11235a] transition">Update Password</button>
              </form>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <form className="grid gap-4 max-w-md">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#FFD700]" />
                  Email Notifications
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#FFD700]" />
                  SMS Notifications
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#FFD700]" />
                  Platform Announcements
                </label>
                <button className="bg-[#0a174e] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#11235a] transition">Save Preferences</button>
              </form>
            </div>
          )}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Management</h2>
              <div className="grid gap-4 max-w-md">
                <button className="bg-[#FFD700] text-[#0a174e] px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">Export My Data</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">Delete Account</button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition">Deactivate Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 