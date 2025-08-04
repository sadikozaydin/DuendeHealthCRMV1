import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBranch } from '../../contexts/BranchContext';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar,
  Award,
  TrendingUp,
  Target,
  Star
} from 'lucide-react';

interface WelcomePanelProps {
  className?: string;
}

const WelcomePanel: React.FC<WelcomePanelProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  const { metrics, loading } = useDashboardMetrics();

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      super_admin: 'Sistem Yöneticisi',
      admin: 'Yönetici',
      manager: 'Müdür',
      doctor: 'Doktor',
      nurse: 'Hemşire',
      agent: 'Satış Temsilcisi',
      coordinator: 'Koordinatör',
      finance: 'Finans Uzmanı',
      partner: 'Partner',
      patient: 'Hasta'
    };
    return roleNames[role] || role;
  };

  const getPersonalPerformance = () => {
    // Rol bazlı performans metrikleri
    switch (user?.role) {
      case 'super_admin':
      case 'admin':
        return {
          title: 'Sistem Genel Durumu',
          metrics: [ 
            { label: 'Aktif Kullanıcı', value: loading ? '...' : metrics.activeUsers.toString(), trend: 'Online' },
            { label: 'Yeni Lead', value: loading ? '...' : metrics.newLeads.toString(), trend: loading ? '...' : metrics.leadGrowth },
            { label: 'Dönüşüm', value: loading ? '...' : `${metrics.conversionRate}%`, trend: loading ? '...' : metrics.conversionGrowth }
          ]
        };
      case 'agent':
        return {
          title: 'Bu Ay Performansınız',
          metrics: [
            { label: 'Yeni Lead', value: '23', trend: '+15%' },
            { label: 'Dönüşüm', value: '7 hasta', trend: '+30%' },
            { label: 'Hedef', value: '%87', trend: 'İyi' }
          ]
        };
      case 'doctor':
        return {
          title: 'Bu Hafta Aktiviteleriniz',
          metrics: [
            { label: 'Muayene', value: '34', trend: '+5' },
            { label: 'Ameliyat', value: '8', trend: '+2' },
            { label: 'Memnuniyet', value: '4.9', trend: '⭐' }
          ]
        };
      case 'nurse':
        return {
          title: 'Bugünkü Görevleriniz',
          metrics: [
            { label: 'Hasta Bakımı', value: '12', trend: 'Aktif' },
            { label: 'İlaç Takibi', value: '8', trend: 'Tamamlandı' },
            { label: 'Vital Takip', value: '15', trend: 'Devam' }
          ]
        };
      default:
        return {
          title: 'Sistem Durumu',
          metrics: [
            { label: 'Aktif Kullanıcı', value: '47', trend: 'Online' },
            { label: 'Sistem Sağlığı', value: '99.9%', trend: 'Mükemmel' },
            { label: 'Performans', value: 'A+', trend: 'Optimal' }
          ]
        };
    }
  };

  const performance = getPersonalPerformance();

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Sol Taraf - Hoşgeldin Mesajı */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="absolute bottom-0 right-0 h-5 w-5 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hoş geldiniz, {user?.name}! 👋
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{getRoleDisplayName(user?.role)}</span>
              </div>
              {currentBranch && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{currentBranch.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Kişisel Performans */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 min-w-[300px]">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="h-4 w-4 text-blue-600" />
            <span>{performance.title}</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {performance.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.label}</div>
                <div className="text-xs text-green-600 font-medium">
                  {loading ? (
                    <div className="h-3 w-8 bg-gray-200 animate-pulse rounded mx-auto mt-1"></div>
                  ) : (
                    metric.trend
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alt Kısım - Hızlı Bilgiler */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-gray-600">Bugün:</span>
            <span className="font-medium text-gray-900">8 randevu</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-gray-600">Bu hafta:</span>
            <span className="font-medium text-gray-900">+15% artış</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Target className="h-4 w-4 text-purple-600" />
            <span className="text-gray-600">Hedef:</span>
            <span className="font-medium text-gray-900">%87 tamamlandı</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Star className="h-4 w-4 text-yellow-600" />
            <span className="text-gray-600">Değerlendirme:</span>
            <span className="font-medium text-gray-900">4.8/5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;