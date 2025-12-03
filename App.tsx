
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { RequestForm } from './pages/RequestForm';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AIChat } from './components/AIChat';
import { db } from './services/db';
import { AlertTriangle, Lock } from 'lucide-react';

const MaintenanceScreen = () => {
    const config = db.getSystemConfig();
    return (
        <div className="min-h-screen bg-[#0B1121] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertTriangle size={48} className="text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{config.maintenanceTitle || 'Sitio en Mantenimiento'}</h1>
            <p className="text-slate-400 text-lg max-w-md mb-8">
                {config.maintenanceMessage || 'Estamos realizando mejoras en nuestra plataforma. Por favor, vuelve a intentarlo más tarde.'}
            </p>
            <a href="/#/admin/login" className="text-slate-600 hover:text-slate-400 text-sm flex items-center gap-2 transition-colors">
                <Lock size={14} /> Acceso Administrativo
            </a>
        </div>
    );
};

const PublicRoute = ({ children }: { children?: React.ReactNode }) => {
    const config = db.getSystemConfig();
    if (config.maintenanceMode) {
        return <MaintenanceScreen />;
    }
    return <>{children}</>;
};

function App() {
  return (
    <HashRouter>
      <div className="antialiased">
        <Routes>
          {/* Public Routes - Protected by Maintenance Mode */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/request" element={<PublicRoute><RequestForm /></PublicRoute>} />
          
          {/* Admin Routes - Always Accessible */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        
        {/* Chat only shows if NOT in maintenance mode */}
        <PublicRoute>
            <AIChat />
        </PublicRoute>
      </div>
    </HashRouter>
  );
}

export default App;
