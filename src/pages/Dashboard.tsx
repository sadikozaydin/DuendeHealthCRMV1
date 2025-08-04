import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Save,
  CheckCircle,
  Loader2,
  Bell
} from 'lucide-react';

// Dashboard widget components
import WelcomePanel from '../components/dashboard/WelcomePanel';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationCenter from '../components/dashboard/NotificationCenter';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import PatientFlow from '../components/dashboard/PatientFlow';
import RecentActivity from '../components/dashboard/RecentActivity';
import TreatmentOverview from '../components/dashboard/TreatmentOverview';
import AnalyticsWidgets from '../components/dashboard/AnalyticsWidgets';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import InternalChatWidget from '../components/dashboard/InternalChatWidget';
import HelpSupport from '../components/dashboard/HelpSupport';
import CustomizationModal from '../components/dashboard/CustomizationModal';

// Services
import { 
  loadDashboardSettings, 
  saveDashboardSettings, 
  resetDashboardSettings,
  DashboardSettings 
} from '../services/dashboardSettingsService';
import { getRoleBasedWidgets } from '../utils/roleUtils';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  
  const [settings, setSettings] = useState<DashboardSettings>({
    layout: 'default',
    theme: 'light',
    widgetVisibility: {},
    widgetOrder: [],
    gridLayout: [],
    language: 'tr'
  });
  
  const [showCustomization, setShowCustomization] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Kullanıcının rolüne göre mevcut widget'ları al
  const availableWidgets = getRoleBasedWidgets(user?.role);

  // Dashboard ayarlarını yükle
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      try {
        const result = await loadDashboardSettings(user.id);
        if (result.success && result.data) {
          setSettings(result.data);
        }
      } catch (error) {
        console.error('Dashboard settings load error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [user?.id]);

  // Ayarları kaydet
  const handleSaveSettings = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    try {
      const result = await saveDashboardSettings(user.id, settings);
      if (result.success) {
        setLastSavedAt(new Date());
      }
    } catch (error) {
      console.error('Dashboard settings save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Ayarları sıfırla
  const handleResetSettings = async () => {
    if (!user?.id) return;
    
    if (window.confirm('Tüm dashboard ayarlarını varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
      try {
        const result = await resetDashboardSettings(user.id);
        if (result.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Dashboard settings reset error:', error);
      }
    }
  };

  // Widget render fonksiyonu
  const renderWidget = (widgetId: string) => {
    if (!settings.widgetVisibility[widgetId]) return null;

    const commonProps = { className: "h-full" };

    switch (widgetId) {
      case 'welcome':
        return <WelcomePanel {...commonProps} />;
      case 'stats':
        return <DashboardStats {...commonProps} />;
      case 'quickActions':
        return <QuickActions {...commonProps} />;
      case 'notifications':
        return <NotificationCenter {...commonProps} />;
      case 'calendar':
        return <CalendarWidget {...commonProps} />;
      case 'patientFlow':
        return <PatientFlow {...commonProps} />;
      case 'recentActivity':
        return <RecentActivity {...commonProps} />;
      case 'treatment':
        return (
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <TreatmentOverview {...commonProps} />
          </div>
        );
      case 'internalChat':
        return <InternalChatWidget {...commonProps} />;
      case 'help':
        return (
          <div className="h-fit">
            <HelpSupport {...commonProps} />
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-fit">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.welcome')}</h1>
          <p className="text-gray-600 mt-1">
            {currentBranch ? `${currentBranch.name} - ` : ''}
            {new Date().toLocaleDateString('tr-TR', {
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors relative"
            >
              <Bell className="h-4 w-4" />
              <span>Bildirimler</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                4
              </span>
            </button>
            
            {/* Bildirim Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <NotificationCenter className="border-0 shadow-none" />
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowCustomization(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Özelleştir</span>
          </button>
        </div>
      </div>

      {/* Dashboard Layout - Organized Structure */}
      <div className="space-y-6">
        {/* 1. Hoşgeldiniz Widget - Full Width */}
        <div className="w-full">
          <WelcomePanel />
        </div>
        
        {/* 2. Analitik Widget - Full Width */}
        <div className="w-full">
          <DashboardStats />
        </div>
        
        {/* 3. İki Sütun: Hızlı Erişim + Ajanda & Takvim */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <CalendarWidget />
        </div>
        
        {/* 4. İki Sütun: Hasta Akış Süreci + İç Sohbet Sistemi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PatientFlow />
          <InternalChatWidget />
        </div>
        
        {/* 5. İki Sütun: Sistem Analitikleri + Genel Performans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsWidgets />
          <PerformanceMetrics />
        </div>
        
        {/* 6. İki Sütun: Son Aktiviteler + Yardım & Destek */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <HelpSupport />
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <CustomizationModal
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
          availableWidgets={availableWidgets}
          settings={settings}
          onSettingsChange={setSettings}
          lastSavedAt={lastSavedAt}
          onSave={handleSaveSettings}
          onReset={handleResetSettings}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default Dashboard;