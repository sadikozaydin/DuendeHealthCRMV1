import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import KVKK from './pages/KVKK';
import Privacy from './pages/Privacy';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import TravelCoordination from './pages/TravelCoordination';
import Settings from './pages/Settings';
import Branches from './pages/Branches';
import LeadManagement from './pages/LeadManagement';
import DocumentManagement from './pages/DocumentManagement';
import EmailTester from './pages/EmailTester';
import Appointments from './pages/Appointments';
import ClinicalProcess from './pages/ClinicalProcess';
import TreatmentProcesses from './pages/TreatmentProcesses';
import InventoryManagement from './pages/InventoryManagement';
import PaymentManagement from './pages/PaymentManagement';
import CommunicationHub from './pages/CommunicationHub';
import Offers from './pages/Offers';
import PartnerManagement from './pages/PartnerManagement';
import PatientPortal from './pages/PatientPortal';
import AIAutomationImprovement from './pages/AIAutomationImprovement';
import Analytics from './pages/Analytics';
import WebhookLogs from './pages/WebhookLogs';
import InternalChatPage from './pages/InternalChatPage';
import { MessageCircle } from 'lucide-react';
import HRManagement from './pages/HRManagement';
import CRMChat from './components/chat/CRMChat';
import { AuthProvider } from './contexts/AuthContext';
import { BranchProvider } from './contexts/BranchContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { DataProvider } from './contexts/DataContext';
import { useAuth } from './contexts/AuthContext';
import { useBranch } from './contexts/BranchContext';

const AppContent = () => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  const [showInternalChat, setShowInternalChat] = useState(false);

  if (!user) {
    return <Login />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="relative h-full">
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width)' }}>
              <div className="max-w-full">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/kvkk" element={<KVKK />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator']}>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/leads" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'agent']} requiredPermissions={['leads.view']}>
                      <LeadManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/patients" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator']} requiredPermissions={['patients.view']}>
                      <Patients />
                    </ProtectedRoute>
                  } />
                  <Route path="/appointments" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'coordinator']} requiredPermissions={['appointments.view']}>
                      <Appointments />
                    </ProtectedRoute>
                  } />
                  <Route path="/clinical-process" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'doctor', 'nurse']} requiredPermissions={['clinical.view']}>
                      <TreatmentProcesses />
                    </ProtectedRoute>
                  } />
                  <Route path="/documents" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator']} requiredPermissions={['documents.view']}>
                      <DocumentManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/travel" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'coordinator']} requiredPermissions={['travel.view']}>
                      <TravelCoordination />
                    </ProtectedRoute>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager']} requiredPermissions={['reports.view']}>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager']} requiredPermissions={['inventory.view']}>
                      <InventoryManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/payments" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'finance']} requiredPermissions={['payments.view']}>
                      <PaymentManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/communication" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'agent', 'coordinator']} requiredPermissions={['communication.view']}>
                      <CommunicationHub />
                    </ProtectedRoute>
                  } />
                  <Route path="/internal-chat" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator']} requiredPermissions={['communication.view']}>
                      <InternalChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/hr" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager']} requiredPermissions={['hr.view']}>
                      <HRManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/offers" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager', 'agent', 'coordinator']} requiredPermissions={['offers.view']}>
                      <Offers />
                    </ProtectedRoute>
                  } />
                  <Route path="/partners" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin', 'manager']} requiredPermissions={['partners.view']}>
                      <PartnerManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/patient-portal" element={
                    <ProtectedRoute requiredRoles={['patient']} requiredPermissions={['portal.access']}>
                      <PatientPortal />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-automation" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin']} requiredPermissions={['settings.view']}>
                      <AIAutomationImprovement />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin']} requiredPermissions={['settings.view']}>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/email-tester" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin']} requiredPermissions={['settings.view']}>
                      <EmailTester />
                    </ProtectedRoute>
                  } />
                  <Route path="/webhook-logs" element={
                    <ProtectedRoute requiredRoles={['super_admin', 'admin']} requiredPermissions={['settings.view']}>
                      <WebhookLogs />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
              
              {/* Global Footer */}
              <div className="mt-12 py-6 border-t border-gray-200 text-gray-500">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span>Son güncelleme: {new Date().toLocaleString('tr-TR')}</span>
                    {currentBranch && (
                      <span className="ml-4">Aktif Şube: {currentBranch.name}</span>
                    )}
                  </div>
                  <div>
                    <span>Duende Health CRM v1.0.1</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <BranchProvider>
        <DataProvider>
          <Router>
            <AppContent />
          </Router>
        </DataProvider>
      </BranchProvider>
    </AuthProvider>
  );
}

export default App;