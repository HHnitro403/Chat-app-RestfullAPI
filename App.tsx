
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ApiDocsPage from './pages/ApiDocsPage';
import DeviceVerificationModal from './components/DeviceVerificationModal';
import type { User } from './types';
import { View } from './types';


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDeviceVerified, setDeviceVerified] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>(View.CHAT);

  useEffect(() => {
    const verifiedDevice = localStorage.getItem('deviceVerified');
    if (verifiedDevice === 'true') {
      setDeviceVerified(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    setUser({ id: 'user-1', name: username, avatar: `https://i.pravatar.cc/150?u=${username}` });
    if (!isDeviceVerified) {
      setShowVerificationModal(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  const handleVerifyDevice = () => {
    localStorage.setItem('deviceVerified', 'true');
    setDeviceVerified(true);
    setShowVerificationModal(false);
  };

  const renderView = useCallback(() => {
    if (!user) {
      return <LoginPage onLogin={handleLogin} />;
    }
    switch (currentView) {
      case View.API_DOCS:
        return <ApiDocsPage />;
      case View.CHAT:
      default:
        return <ChatPage user={user} />;
    }
  }, [user, currentView]);

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-gray-900 text-gray-100">
      {user && (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-3 flex justify-between items-center shadow-lg z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-indigo-400">Secure Messenger</h1>
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView(View.CHAT)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentView === View.CHAT ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                Chat
              </button>
              <button
                onClick={() => setCurrentView(View.API_DOCS)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentView === View.API_DOCS ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                API Docs
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-sm font-medium">{user.name}</span>
              {isDeviceVerified && <div className="text-xs text-green-400">Device Verified</div>}
            </div>
            <img src={user.avatar} alt="User avatar" className="w-8 h-8 rounded-full" />
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </header>
      )}
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
      {showVerificationModal && <DeviceVerificationModal onVerify={handleVerifyDevice} />}
    </div>
  );
};

export default App;
